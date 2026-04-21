// bulk-index-fredsazy.js
import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { mkdir, writeFile } from 'fs/promises';

console.log("🚀 Starting bulk-index script for fredsazy.com");

// Load .env variables
dotenv.config();

// Create logs directory
const logsDir = join(process.cwd(), 'logs');
try {
  await mkdir(logsDir, { recursive: true });
} catch {}

// Polyfill fetch if needed
if (typeof fetch === 'undefined') {
  const { default: fetch } = await import('node-fetch');
  global.fetch = fetch;
}

// Sanity client configuration - UPDATED for fredsazy.com
const client = createClient({
  projectId: '78gw77n7', // Your existing project ID
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN || 'skQEl9vAMvX9mBY0zhJqpoxVedtUIvAtMMWuX3epIoVuyR3zPdFNKfFNmFBRL2YiUpGNlGyANdGZjc8rHBaIwAcASGMLSCkf3x9q7JGyQcjY721kYZkGaOeel3Q9Gv7E3I9S1Qdf9GHIbEFbDJGpgtysklUzxzdr3PrS1EBoQoWLAfJOXqdO', // Your token
});

const BASE_URL = 'https://fredsazy.com';
const API_ENDPOINT = `${BASE_URL}/api/indexnow`;
const INDEXNOW_KEY = '85978d9336e94e40991c5dc9252f5ddc'; 

// Global category map used to resolve parent slugs when needed
let CATEGORY_MAP = {};

// Build the public URL for a post - SIMPLIFIED for fredsazy.com
function getPublicUrlForPost(post) {
  // Default: all posts go to /blog/slug
  return `${BASE_URL}/blog/${post.slug}`;
}

// Log results to file
const logStream = createWriteStream(join(logsDir, 'bulk-index.log'), { flags: 'a' });
const errorStream = createWriteStream(join(logsDir, 'bulk-index-errors.log'), { flags: 'a' });

function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  logStream.write(logMessage);
  console.log(message);
}

function logError(message) {
  const timestamp = new Date().toISOString();
  const errorMessage = `[${timestamp}] ${message}\n`;
  errorStream.write(errorMessage);
  console.error(message);
}

// Test API endpoint connectivity
async function testApiConnectivity() {
  log('🔍 Testing API endpoint connectivity...');
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    const response = await fetch(`${API_ENDPOINT}?checkKey=true`, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        'User-Agent': 'Fredsazy-Bulk-Indexer/1.0',
        'Accept': 'application/json'
      }
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      log('✅ API endpoint is reachable');
      return true;
    } else {
      logError(`❌ API returned status ${response.status}`);
      return false;
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      logError('❌ API connection timeout');
    } else {
      logError(`❌ API connection error: ${error.message}`);
    }
    return false;
  }
}

// Direct IndexNow submission
async function submitDirectToIndexNow(post) {
  const startTime = Date.now();
  
  try {
    const host = 'fredsazy.com';
    const finalUrl = getPublicUrlForPost(post);
    
    log(`   🌐 Direct submission to IndexNow: ${finalUrl}`);

    const payload = {
      host: host,
      key: INDEXNOW_KEY,
      keyLocation: `https://${host}/${INDEXNOW_KEY}.txt`,
      urlList: [finalUrl],
    };

    const endpoints = [
      'https://api.indexnow.org/indexnow',
      'https://www.bing.com/indexnow',
      'https://yandex.com/indexnow'
    ];

    let lastError = '';

    for (const endpoint of endpoints) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'User-Agent': 'Fredsazy-Bulk-Indexer/1.0'
          },
          body: JSON.stringify(payload),
          signal: controller.signal
        });

        clearTimeout(timeoutId);
        
        const elapsed = Date.now() - startTime;

        if (response.ok) {
          log(`   ✅ Direct success (${elapsed}ms) via ${endpoint.replace('https://', '')}`);
          return { success: true, method: 'direct', elapsed };
        } else {
          const responseText = await response.text();
          lastError = `${endpoint}: ${response.status}`;
        }
      } catch (error) {
        lastError = `${endpoint}: ${error.message}`;
      }
    }

    return { success: false, method: 'direct', error: lastError };

  } catch (error) {
    return { success: false, method: 'direct', error: error.message };
  }
}

// Submit single post
async function submitPost(post, index, total) {
  const startTime = Date.now();
  
  log(`\n📦 Processing ${index + 1}/${total}: ${post.title}`);
  log(`   Slug: ${post.slug}`);
  log(`   URL: ${getPublicUrlForPost(post)}`);

  const payload = {
    slug: post.slug,
    url: getPublicUrlForPost(post),
    publishedAt: post.publishedAt,
    documentType: post._type,
    documentId: post._id,
    isDraft: post._id?.includes('drafts.') || false,
  };

  // Try via API endpoint first
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'User-Agent': 'Fredsazy-Bulk-Indexer/1.0'
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    const elapsed = Date.now() - startTime;

    if (response.ok) {
      log(`✅ API Success (${elapsed}ms)`);
      return { success: true, method: 'api', post };
    } else {
      log(`   API returned ${response.status}, falling back to direct...`);
      return await tryDirectSubmission(post, elapsed);
    }
  } catch (error) {
    const elapsed = Date.now() - startTime;
    log(`   API error: ${error.message}, falling back to direct...`);
    return await tryDirectSubmission(post, elapsed);
  }
}

async function tryDirectSubmission(post, previousElapsed) {
  const directResult = await submitDirectToIndexNow(post);
  
  if (directResult.success) {
    return { success: true, method: directResult.method, post };
  } else {
    return { success: false, method: directResult.method, error: directResult.error, post };
  }
}

// Check key file accessibility
async function checkKeyFile() {
  log('\n🔑 Checking IndexNow key file accessibility...');
  const keyUrl = `https://fredsazy.com/${INDEXNOW_KEY}.txt`;
  
  try {
    const response = await fetch(keyUrl);
    
    if (response.ok) {
      const keyContent = await response.text();
      const trimmedKey = keyContent.trim();
      
      if (trimmedKey === INDEXNOW_KEY) {
        log(`✅ Key file accessible: ${keyUrl}`);
        return true;
      } else {
        logError(`❌ Key file content mismatch`);
        return false;
      }
    } else {
      logError(`❌ Key file not accessible: ${keyUrl}`);
      return false;
    }
  } catch (error) {
    logError(`❌ Cannot access key file: ${error.message}`);
    return false;
  }
}

// Main bulk indexing function
async function bulkIndexSanityPosts() {
  log('🚀 Starting bulk indexing for fredsazy.com...');
  log('📌 Base URL:', BASE_URL);
  log('📌 API Endpoint:', API_ENDPOINT);

  await checkKeyFile();
  await testApiConnectivity();

  try {
    // Fetch ALL published posts (no category filter)
    log('\n📡 Fetching all posts from Sanity...');
    
    const query = `*[_type == "post" && !(_id in path("drafts.**")) && defined(publishedAt) && publishedAt <= now()]{
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      _type
    } | order(publishedAt desc)`;

    const allPosts = await client.fetch(query);
    
    log(`📝 Found ${allPosts.length} total posts`);

    if (!allPosts.length) {
      log('❌ No posts found.');
      return;
    }

    // Show first few posts as sample
    const sampleSize = Math.min(5, allPosts.length);
    log(`📋 Sample of first ${sampleSize} posts:`);
    for (let i = 0; i < sampleSize; i++) {
      log(`   ${i + 1}. ${allPosts[i].title} -> ${getPublicUrlForPost(allPosts[i])}`);
    }

    // Process posts
    let successCount = 0;
    let errorCount = 0;
    const failedPosts = [];
    const successMethods = { api: 0, direct: 0 };
    const startTime = Date.now();

    for (let i = 0; i < allPosts.length; i++) {
      const post = allPosts[i];
      
      // Progress indicator every 10 posts
      if (i % 10 === 0 && i > 0) {
        const progress = ((i + 1) / allPosts.length * 100).toFixed(1);
        log(`\n📈 Progress: ${i + 1}/${allPosts.length} (${progress}%)`);
        log(`   ✅ Success: ${successCount} | ❌ Failed: ${errorCount}`);
      }
      
      const result = await submitPost(post, i, allPosts.length);
      
      if (result.success) {
        successCount++;
        successMethods[result.method] = (successMethods[result.method] || 0) + 1;
      } else {
        errorCount++;
        failedPosts.push({
          post: { title: post.title, slug: post.slug, id: post._id },
          error: result.error
        });
      }

      // Rate limiting: wait 500ms between requests
      if (i < allPosts.length - 1) {
        await new Promise((res) => setTimeout(res, 500));
      }
    }

    // Final summary
    const totalElapsedMinutes = (Date.now() - startTime) / 1000 / 60;
    
    log('\n' + '='.repeat(60));
    log('🎉 BULK INDEXING COMPLETED!');
    log('='.repeat(60));
    log(`⏱️ Total time: ${totalElapsedMinutes.toFixed(1)} minutes`);
    log(`✅ Successful: ${successCount}`);
    log(`❌ Failed: ${errorCount}`);
    log(`📊 Total processed: ${allPosts.length}`);
    log(`📈 Success rate: ${((successCount / allPosts.length) * 100).toFixed(1)}%`);
    
    log('\n📊 Success by method:');
    Object.entries(successMethods).forEach(([method, count]) => {
      log(`   ${method}: ${count} posts`);
    });

    // Save failed posts
    if (failedPosts.length > 0) {
      const failedFile = join(logsDir, `failed-posts-${Date.now()}.json`);
      await writeFile(failedFile, JSON.stringify(failedPosts, null, 2));
      log(`\n📝 Failed posts saved to: ${failedFile}`);
    }

    log('\n' + '='.repeat(60));
    if (errorCount === 0) {
      log('🎉 ALL POSTS SUBMITTED SUCCESSFULLY!');
    } else {
      log(`⚠️ ${errorCount} posts failed.`);
    }
    log('='.repeat(60));

  } catch (error) {
    logError('\n💥 Bulk indexing failed:', error);
  } finally {
    logStream.end();
    errorStream.end();
  }
}

// Run the script
await bulkIndexSanityPosts();
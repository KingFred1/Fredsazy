// bulk-index-fredsazy.js - FIXED VERSION
import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { mkdir, writeFile } from 'fs/promises';

console.log("🚀 Starting bulk-index script for fredsazy.com");

dotenv.config();

const logsDir = join(process.cwd(), 'logs');
try {
  await mkdir(logsDir, { recursive: true });
} catch {}

if (typeof fetch === 'undefined') {
  const { default: fetch } = await import('node-fetch');
  global.fetch = fetch;
}

// Sanity client configuration
const client = createClient({
  projectId: 'kt8oqcrg',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN || 'skQEl9vAMvX9mBY0zhJqpoxVedtUIvAtMMWuX3epIoVuyR3zPdFNKfFNmFBRL2YiUpGNlGyANdGZjc8rHBaIwAcASGMLSCkf3x9q7JGyQcjY721kYZkGaOeel3Q9Gv7E3I9S1Qdf9GHIbEFbDJGpgtysklUzxzdr3PrS1EBoQoWLAfJOXqdO',
});

const BASE_URL = 'https://fredsazy.com';
const INDEXNOW_KEY = '85978d9336e94e40991c5dc9252f5ddc';

function getPublicUrlForPost(post) {
  return `${BASE_URL}/blog/${post.slug}`;
}

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

async function submitToIndexNow(post) {
  const startTime = Date.now();
  const finalUrl = getPublicUrlForPost(post);
  
  log(`   🌐 Submitting to IndexNow: ${finalUrl}`);

  const payload = {
    host: 'fredsazy.com',
    key: INDEXNOW_KEY,
    keyLocation: `https://fredsazy.com/${INDEXNOW_KEY}.txt`,
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
        log(`   ✅ Success (${elapsed}ms) via ${endpoint.replace('https://', '')}`);
        return { success: true, endpoint, elapsed };
      } else {
        lastError = `${endpoint}: ${response.status}`;
        log(`   ⚠️ ${endpoint.replace('https://', '')} returned ${response.status}`);
      }
    } catch (error) {
      lastError = `${endpoint}: ${error.message}`;
      log(`   ⚠️ ${endpoint.replace('https://', '')} error: ${error.message}`);
    }
  }

  return { success: false, error: lastError };
}

async function checkKeyFile() {
  log('\n🔑 Checking IndexNow key file...');
  const keyUrl = `https://fredsazy.com/${INDEXNOW_KEY}.txt`;
  
  try {
    const response = await fetch(keyUrl);
    if (response.ok) {
      log(`✅ Key file accessible: ${keyUrl}`);
      return true;
    } else {
      logError(`❌ Key file not accessible: ${keyUrl}`);
      return false;
    }
  } catch (error) {
    logError(`❌ Cannot access key file: ${error.message}`);
    return false;
  }
}

async function bulkIndexSanityPosts() {
  log('🚀 Starting bulk indexing for fredsazy.com...');

  await checkKeyFile();

  try {
    // FIXED: Simple query with NO parameters
    log('\n📡 Fetching all posts from Sanity...');
    
    const query = `*[_type == "post" && defined(slug.current) && defined(_createdAt)] | order(_createdAt desc){
      _id,
      title,
      "slug": slug.current,
      _createdAt,
    }`;

    const allPosts = await client.fetch(query);
    
    log(`📝 Found ${allPosts.length} total posts`);

    if (!allPosts.length) {
      log('❌ No posts found.');
      return;
    }

    const sampleSize = Math.min(5, allPosts.length);
    log(`📋 Sample of first ${sampleSize} posts:`);
    for (let i = 0; i < sampleSize; i++) {
      log(`   ${i + 1}. ${allPosts[i].title} -> ${getPublicUrlForPost(allPosts[i])}`);
    }

    let successCount = 0;
    let errorCount = 0;
    const failedPosts = [];
    const startTime = Date.now();

    for (let i = 0; i < allPosts.length; i++) {
      const post = allPosts[i];
      
      if (i % 10 === 0 && i > 0) {
        const progress = ((i + 1) / allPosts.length * 100).toFixed(1);
        log(`\n📈 Progress: ${i + 1}/${allPosts.length} (${progress}%)`);
        log(`   ✅ Success: ${successCount} | ❌ Failed: ${errorCount}`);
      }
      
      const result = await submitToIndexNow(post);
      
      if (result.success) {
        successCount++;
      } else {
        errorCount++;
        failedPosts.push({
          post: { title: post.title, slug: post.slug },
          error: result.error
        });
      }

      if (i < allPosts.length - 1) {
        await new Promise((res) => setTimeout(res, 500));
      }
    }

    const totalElapsedMinutes = (Date.now() - startTime) / 1000 / 60;
    
    log('\n' + '='.repeat(60));
    log('🎉 BULK INDEXING COMPLETED!');
    log('='.repeat(60));
    log(`⏱️ Total time: ${totalElapsedMinutes.toFixed(1)} minutes`);
    log(`✅ Successful: ${successCount}`);
    log(`❌ Failed: ${errorCount}`);
    log(`📊 Total processed: ${allPosts.length}`);
    
    if (failedPosts.length > 0) {
      const failedFile = join(logsDir, `failed-posts-${Date.now()}.json`);
      await writeFile(failedFile, JSON.stringify(failedPosts, null, 2));
      log(`\n📝 Failed posts saved to: ${failedFile}`);
    }

  } catch (error) {
    logError('\n💥 Bulk indexing failed:');
    logError(`   ${error.message}`);
  } finally {
    logStream.end();
    errorStream.end();
  }
}

await bulkIndexSanityPosts();
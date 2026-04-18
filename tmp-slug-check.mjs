import fs from 'fs';
const txt = fs.readFileSync('.env.local', 'utf8');
const env = Object.fromEntries(txt.split(/\r?\n/)
  .map(l => l.replace(/#.*$/, '').trim())
  .filter(Boolean)
  .map(l => {
    const idx = l.indexOf('=');
    let v = l.slice(idx + 1);
    if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1);
    return [l.slice(0, idx), v];
  }));

const { createClient } = await import('next-sanity');
const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: false,
});
const query = '*[_type == "post" && slug.current == $slug][0]{_id,title,slug}';
const post = await client.fetch(query, { slug: 'why-your-ai-agent-pipelines-will-fail-without-declarative-dsls' });
console.log(post);

import { put } from '@vercel/blob';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const videos = [
  { name: 'team-azka',   path: './public/team-azka.mp4' },
  { name: 'team-salma',  path: './public/team-salma.mp4' },
  { name: 'team-aulia',  path: './public/team-aulia.mp4' },
  { name: 'team-wildan', path: './public/team-wildan.mp4' },
  { name: 'team-zaky',   path: './public/team-zaky.mp4' },
  { name: 'team-natasya',   path: './public/team-natasya.mp4' },
];

console.log('🚀 Mulai upload video ke Vercel Blob...\n');

for (const video of videos) {
  try {
    const filePath = resolve(video.path);
    const file = readFileSync(filePath);

    const blob = await put(`team/${video.name}.mp4`, file, {
      access: 'public',
      contentType: 'video/mp4',
    });

    console.log(`✅ ${video.name}`);
    console.log(`   URL: ${blob.url}\n`);
  } catch (err) {
    console.error(`❌ Gagal upload ${video.name}:`, err.message);
  }
}

console.log('🎉 Selesai! Copy URL di atas ke data/landing.ts');
import { put, del, list } from '@vercel/blob';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

// Hapus semua blob lama dulu
console.log('🗑️  Menghapus blob lama...\n');
const { blobs } = await list();
for (const blob of blobs) {
  await del(blob.url);
  console.log(`🗑️  Dihapus: ${blob.pathname}`);
}

// Sesuaikan nama file dengan yang ada di folder /public
const videos = [
  { name: 'team-azka',    path: './public/Team-Azka.mp4' },
  { name: 'team-salma',   path: './public/Team-Salma.mp4' },
  { name: 'team-aulia',   path: './public/Team-Aulia.mp4' },
  { name: 'team-wildan',  path: './public/Team-Wildan.mp4' },
  { name: 'team-zaky',    path: './public/Team-Zaky.mp4' },
  { name: 'team-natasya', path: './public/Team-Natasya.mp4' },
];

console.log('\n🚀 Mulai upload ulang...\n');

for (const video of videos) {
  try {
    const file = readFileSync(resolve(video.path));
    const blob = await put(`team/${video.name}.mp4`, file, {
      access: 'public',
      contentType: 'video/mp4',
      allowOverwrite: true,  // ← izinkan overwrite
    });
    console.log(`✅ ${video.name}`);
    console.log(`   URL: ${blob.url}\n`);
  } catch (err) {
    console.error(`❌ Gagal: ${video.name} →`, err.message);
  }
}

console.log('🎉 Selesai!');
import fs from 'fs';
import path from 'path';

// Define the path to the videos.json file
const filePath = path.resolve('src/app/data/videos.json');  // Adjust path if needed

export async function GET(req) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const videos = JSON.parse(fileContent || '[]');  // Ensure empty array if file is empty

    return new Response(JSON.stringify(videos), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error reading video file:', error);
    return new Response(JSON.stringify({ error: 'Failed to load videos' }), {
      status: 500,
    });
  }
}

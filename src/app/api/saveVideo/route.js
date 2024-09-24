import fs from 'fs';
import path from 'path';

// Define the path to the videos.json file
const filePath = path.resolve('src/app/data/videos.json');  // Adjust this if needed

export async function POST(req) {
  try {
    const { link, description } = await req.json();

    if (!link || !description) {
      return new Response(JSON.stringify({ error: 'Video link and description are required' }), {
        status: 400,
      });
    }

    // Read the existing videos
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const videos = JSON.parse(fileContent);

    // Add the new video
    const newVideo = { link, description };
    videos.push(newVideo);

    // Save the updated video data
    fs.writeFileSync(filePath, JSON.stringify(videos, null, 2));

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Error saving video:', error);
    return new Response(JSON.stringify({ error: 'Failed to save video' }), { status: 500 });
  }
}

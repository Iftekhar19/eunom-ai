import axios from 'axios';
 import { NextResponse } from 'next/server';
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '32mb', // Increase if needed
    },
  },
};

export async function GET(req, res) {
  if (req.method !== 'POST') {
    return  NextResponse.json({
        error: 'Method not allowed'

},{status:405});
  }

  const { base64Image } = req.body; // Expect base64 image string
  const IMGDB_API_KEY = process.env.NEXT_PUBLIC_IMGDB_API_KEY;

  try {
    const response = await axios.post('https://imgdb.net/api/upload', {
      key: IMGDB_API_KEY,
      image: base64Image, // base64 encoded image
    });

    return NextResponse.json({ url: response.data.data.url }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
        error: 'Image upload failed', 
        details: error.response?.data
    }, { status: 500 });
  }
}

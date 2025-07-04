import axios from 'axios';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '32mb', // Increase if needed
    },
  },
};

export default async function uploadImage(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { base64Image } = req.body; // Expect base64 image string
  const IMGDB_API_KEY = process.env.NEXT_PUBLIC_IMGDB_API_KEY;

  try {
    const response = await axios.post('https://imgdb.net/api/upload', {
      key: IMGDB_API_KEY,
      image: base64Image, // base64 encoded image
    });

    return res.status(200).json({ url: response.data.data.url });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Image upload failed', details: error.response?.data });
  }
}

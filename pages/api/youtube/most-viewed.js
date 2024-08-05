
import axios from 'axios';

export default async (req, res) => {
  try {
    const { topic } = req.query;

    if (!topic) {
      return res.status(400).json({ error: 'Missing topic parameter' });
    }

    const apiKey = process.env.YOUTUBE_API_KEY; 
    const maxResults = 3;

    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search`,
      {
        params: {
          key: apiKey,
          q: topic,
          type: 'video',
          part: 'id',
          maxResults,
          order: 'viewCount',
        },
      }
    );

    if (response.data.items.length === 0) {
      return res.status(404).json({ error: 'No videos found' });
    }

    const videoId = response.data.items[0].id.videoId;
    const videoLink = `${videoId}`;

    res.status(200).json({ videoLink });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());


app.get('/youtube-playlist', async (req, res) => {
    const { mood, genre } = req.query;

    if (!mood || !genre) {
        return res.status(400).json({ error: 'Missing mood or genre parameter' });
    }

    const apiKey = process.env.YOUTUBE_API_KEY; 
    const query = `Best ${genre} music for ${mood.toLowerCase()} mood`;
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=playlist&q=${encodeURIComponent(query)}&maxResults=1&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.items && data.items.length > 0) {
            const playlistId = data.items[0].id.playlistId;
            res.json({ playlistUrl: `https://www.youtube.com/playlist?list=${playlistId}` });
        } else {
            res.status(404).json({ error: 'No playlist found!' });
        }
    } catch (error) {
        console.error('Error fetching YouTube data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

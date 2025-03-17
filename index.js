import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Set up __dirname in ES Module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // Middleware to parse JSON requests

// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// AI Route to communicate with Ollama
app.post('/ask-ai', async (req, res) => {
    const { prompt } = req.body;
    if (!prompt) {
        return res.status(400).json({ error: "No prompt provided." });
    }

    try {
        const ollamaResponse = await fetch("http://localhost:11434/api/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ model: "mistral", prompt }),
        });

        if (!ollamaResponse.ok) {
            throw new Error("Failed to get response from Ollama.");
        }

        const data = await ollamaResponse.json();
        res.json({ response: data.response });
    } catch (error) {
        console.error("Error fetching AI response:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

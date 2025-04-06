import express from "express";
import Together from "together-ai";
import dotenv from "dotenv";
import cors from "cors";

// Load environment variables
dotenv.config();

// Initialize Express server
const app = express();

// Enable CORS
app.use(cors());

app.use(express.json());

// Initialize Together AI client
const together = new Together({ apiKey: process.env.TOGETHER_API_KEY });

// Define the chat route
app.post("/chat", async (req, res) => {
    try {
        const userMessage = req.body.message;
        const response = await together.chat.completions.create({
            model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
            messages: [{ "role": "user", "content": userMessage }],
        });

        res.json({ reply: response.choices[0].message.content });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed to process request" });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const { HfInference } = require("@huggingface/inference");

const Question = require('./Models/models'); // Corrected model import
const User = require('./Models/auth.model'); // New User model

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const hf = new HfInference(process.env.HF_API_KEY);
const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

/** ✅ **User Authentication** **/

// Register User
app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    try {
        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Registration failed" });
    }
});

// Login User
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Login failed" });
    }
});

// Middleware to Verify Token
const authenticateToken = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(403).json({ message: "Access denied" });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        req.user = user;
        next();
    });
};

/** ✅ **Quiz Management** **/

// Health Check Route
app.get('/', (req, res) => {
    res.status(200).json({ message: "Server running" });
});

// Get All Questions
app.get('/questions', async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json(questions);
    } catch (err) {
        res.status(404).json({ message: "Cannot get the questions" });
    }
});

// Create New Question
app.post('/questions', async (req, res) => {
    try {
        const { question, possibleAnswer, answer } = req.body;
        if (!question || !possibleAnswer || !answer) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newQuestion = new Question({ question, possibleAnswer, answer });
        const savedQuestion = await newQuestion.save();

        res.status(201).json(savedQuestion);
    } catch (err) {
        res.status(500).json({ message: "Failed to add question" });
    }
});

// Update Question
app.put('/questions/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedQuestion = await Question.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedQuestion) {
            return res.status(404).json({ message: "Question not found" });
        }
        res.status(200).json(updatedQuestion);
    } catch (err) {
        res.status(500).json({ message: "Failed to update question" });
    }
});

// Delete Question
app.delete('/questions/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedQuestion = await Question.findByIdAndDelete(id);
        if (!deletedQuestion) {
            return res.status(404).json({ message: "Question not found" });
        }
        res.status(200).json({ message: "Question deleted", data: deletedQuestion });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete question" });
    }
});

// AI Response Endpoint (Hugging Face)
app.post("/ask", async (req, res) => {
    const { question } = req.body;
    try {
        const response = await hf.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [
                { role: "system", content: "You are a helpful AI that answers questions concisely." },
                { role: "user", content: question }
            ],
            max_tokens: 1024
        });
        res.json({ answer: response.choices[0].message.content });
    } catch (err) {
        res.status(500).json({ error: "Failed to get AI response" });
    }
});

// Connect to MongoDB and Start Server
mongoose.connect('mongodb://localhost:27017/startup_log')
    .then(() => {
        console.log("✅ Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    })
    .catch(err => console.error("❌ Database connection error:", err));

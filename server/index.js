const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const Question = require('./Models/models'); // Import MongoDB model
require("dotenv").config();
const { HfInference } = require("@huggingface/inference");

const app = express();
const PORT = 5000; // Change backend port to avoid conflict with React
const hf = new HfInference(process.env.HF_API_KEY);

app.use(cors());
app.use(express.json());

// ✅ Health Check Route
app.get('/', (req, res) => {
  res.status(200).json({ message: "Server running" });
});

// ✅ Get All Questions
app.get('/questions', async (req, res) => {
  try {
    const questions = await Question.find(); // Use await to fetch data
    res.status(200).json(questions);
    console.log("You have received all the questions");
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Cannot get the questions" });
  }
});


// ✅ Create New Question
app.post('/questions', async (req, res) => {
  try {
    const { question, possibleAnswer, answer } = req.body;

    if (!question || !possibleAnswer || !answer) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newQuestion = new Question({ question, possibleAnswer, answer });
    const savedQuestion = await newQuestion.save();

    res.status(201).json(savedQuestion);
    console.log("Added a new question");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add question" });
  }
});

// ✅ Update Question
app.put('/questions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedQuestion = await Question.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.status(200).json(updatedQuestion);
    console.log("Updated question");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update question" });
  }
});

// ✅ Delete Question
app.delete('/questions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedQuestion = await Question.findByIdAndDelete(id);

    if (!deletedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.status(200).json({ message: "Question deleted", data: deletedQuestion });
    console.log("Deleted question");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete question" });
  }
});

// ✅ AI Response Endpoint (Hugging Face)
app.post("/ask", async (req, res) => {
  const { question } = req.body;

  try {
    const response = await hf.chatCompletion({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      messages: [
        { role: "system", content: "You are a helpful AI that answers questions which very short answers ,clearly and concisely." },
        { role: "user", content: question }
      ],
      max_tokens: 1024
    });

    res.json({ answer: response.choices[0].message.content });
  } catch (err) {
    console.error("AI Error:", err.message);
    res.status(500).json({ error: "Failed to get AI response" });
  }
});

// ✅ Connect to MongoDB and Start Server
mongoose.connect('mongodb://localhost:27017/startup_log')
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error("❌ Database connection error:", err));

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const Question = require('./Models/models'); // Correctly import the model

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: "server running" });
});

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


app.post('/questions', async (req, res) => {
    try {
        // Save to DB
        const savedQuestions = await Question.insertMany(req.body);

        res.status(201).json(savedQuestions);
        console.log("You loaded a new question");
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Cannot load the question" });
    }
});


app.post('/questions', async (req, res) => {
    try {
        // Check if all fields are provided
        const { question, possibleAnswer, answer } = req.body;

        if (!question || !possibleAnswer || !answer) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Save to DB
        const newQuestion = new Question({ question, possibleAnswer, answer });
        const savedQuestion = await newQuestion.save();

        res.status(201).json(savedQuestion);
        console.log("You loaded a new question");
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Cannot load the question" });
    }
});


app.put('/questions/:id', async (req, res) => {
    try {
        const { id } = req.params; // Use `req.params` to get the ID from the URL
        const updatedQuestion = await Question.findByIdAndUpdate(id, req.body, { new: true }); // Use `findByIdAndUpdate` for updating

        if (!updatedQuestion) {
            return res.status(404).json({ message: "Question not found" });
        }

        res.status(200).json(updatedQuestion); // Return the updated question
        console.log("Question updated successfully");
    } catch (err) {
        console.error("Error updating question:", err);
        res.status(500).json({ message: "Cannot update the question" });
    }
});


app.delete('/questions/:id', async (req, res) => {
    try {
        const { id } = req.params; // Get the `id` from URL params
        const deletedProduct = await Question.findByIdAndDelete(id); // Use `await` for async operation

        // Check if question exists
        if (!deletedProduct) {
            return res.status(404).json({ message: "Question cannot be found" });
        }

        res.status(200).json({ message: "Question deleted successfully", data: deletedProduct });
        console.log("Question has been deleted");
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Cannot delete question" });
    }
});


mongoose.connect('mongodb://localhost:27017/startup_log')
  .then(() => {
    console.log("Connected to database");
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch(err => console.log("Database connection error:", err));

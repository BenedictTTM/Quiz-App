const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
        unique: true // Each question should be unique
    },
    possibleAnswer: {
        type: [String], // Keep as String or change to Array if storing multiple choices
        required: true
    },
    answer: {
        type: String,
        required: true
    }
});



const ChemQuestion = mongoose.model("ChemQuestion", QuestionSchema);

module.exports = ChemQuestion; // Export the model

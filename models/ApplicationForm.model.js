const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const applicationFormSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    languages: {
        type: [String],
        required: true
    },
    previousExperiences: {
        type: String,
        enum: ['none', 'some', 'many'],
        required: true
    },
    motive: {
        type: String,
        required: true
    }
});

const ApplicationForm = mongoose.model('ApplicationForm', applicationFormSchema);

module.exports = ApplicationForm;
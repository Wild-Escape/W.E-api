const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const applicationFormSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    duration: {
        durationNumber: {
            type: Number,
            required: true
        },
        durationType: {
            type: String,
            required: true
        }
    },
    experience: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Experience',
        required: true
    },
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
        required: true
    },
    motive: {
        type: String,
        required: true
    }
});

const ApplicationForm = mongoose.model('ApplicationForm', applicationFormSchema);

module.exports = ApplicationForm;
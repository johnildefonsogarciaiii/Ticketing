const mongoose = require('mongoose');
const User = require('./userModel')


const ticketSchema = new mongoose.Schema({
    email: {
        type: String
    },
    concern: {
        type: String,
        required: [true, "ticket concern is required"],
        lowercase: true
    },
    description: {
        type: String,
        required: [true, "ticket description is required"],
        lowercase: true
    },
    status: {
        type: String,
        enum: ["submitted", "processing", "completed", "cancelled"],
        default: "submitted",
        lowercase: true
    },
    locationFrom: {
        type: String,
        required: [true, "ticket location FROM is required"],
        lowercase: true
    },
    locationTo: {
        type: String,
        required: [true, "ticket location TO is required"],
        lowercase: true
    },
    contact: {
        type: Number,
        required: [true, "contact number is required"]
    },
    dateRequested: {
        type: Date
    },
    dateProcessed: {
        type: Date
    },
    dateCompleted: {
        type: Date
    }
})




//Creating Ticket model
const Tickets = mongoose.model('Tickets', ticketSchema);

//Exporting Ticket model
module.exports = Tickets;
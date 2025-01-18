const mongoose = require('mongoose')

const jobSchema = mongoose.Schema({
    jobTitle : {
        type : String,
        required : true
    },
    companyName : {
        type : String,
        required : true
    },
    location : {
        type : String,
        required : true
    },
    salary : {
        type : Number,
        required : true
    },
    jobType : {
        type : String,
        enum : ['Full-time (On-site)', 'Part-time (On-site)', 'Full-time (Remote)', 'Part-time (Remote)'],
        default : "Full-time (On-site)",
        required : true
    },
    description : {
        type : String, 
        required : true
    },
    qualifications : {
        type : [String],
        required : true
    }
}, {timestamps : true})

const Job = mongoose.model("Job", jobSchema)

module.exports = Job
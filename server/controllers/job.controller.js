const Job = require("../model/job.model")


const addNewJob = async (req, res) => {
    try{
        const newJob = req.body
        const addedJob = await Job.create(newJob)
        res.status(201).json({message : "New Job Added Successfully", addedJob})
    }catch(error){
        res.status(500).json({message : "Failed to add New Job", error : error.message})
    }
}


const getAllJobs = async (req, res) => {
    try{
        const allJobs = await Job.find()
        res.status(200).json({ message: "Jobs fetched successfully", allJobs })
    }catch(error){
        res.status(500).json({ message: "Failed to fetch jobs", error: error.message })
    }
}


const updateJob = async (req, res) => {
    try{
        const jobId = req.params.id
        const updatedData = req.body

        //find job and update 
        const updatedJob = await Job.findByIdAndUpdate(jobId, updatedData, {new : true})

        if(!updatedJob){
            return res.status(404).json({message : "Job not found"})
        }

        res.status(200).json({ message: "Job updated successfully", updatedJob })
    }catch(error){
        res.status(500).json({ message: "Failed to update jobs", error: error.message })
    }
}

const deleteJob = async (req, res) => {
    try{
        const jobId = req.params.id
        console.log(jobId)
        // find job and delete

        const deletedJob = await Job.findByIdAndDelete(jobId)
        if(!deletedJob){
            return res.status(404).json({ message: "Job not found" })
        }

        res.status(200).json({ message: "Job deleted successfully", deletedJob})

    }catch(error){
        res.status(500).json({ message: "Failed to delete the Job", error: error.message })
    }
}


module.exports = {addNewJob, getAllJobs, updateJob, deleteJob}
const express = require('express')
const cors = require('cors')
const { initializeDatabase } = require('./database/db')
const { addNewJob, getAllJobs, updateJob, deleteJob } = require('./controllers/job.controller')

const app = express()

app.use(express.json())
app.use(cors())


initializeDatabase()


// Welcome API

app.get("/", (req, res) => {
    res.send("Welcome to Mohammad Irshad's Server")
})

// JOB-POSTING-APP API's

app.post('/addNewJob', addNewJob)
app.get('/getAllJobs', getAllJobs)
app.post('/updateJob/:id', updateJob)
app.delete('/deleteJob/:id', deleteJob)


const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running on PORT : ${PORT}`)
})
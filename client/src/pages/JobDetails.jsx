import React from 'react'
import Header from '../components/Header'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const JobDetails = () => {

    const {id} = useParams()   

    const {jobs} = useSelector((state) => state.jobs)

    const selectedJob = jobs.find((job) => job._id === id)
    
  return (
    <div>
      <Header/>
      <main className='container'>
        <h3 className='my-3'>{selectedJob.jobTitle}</h3>
        <div className="card">
            <div className="card-body">
                <p className="card-text"> <strong>Company Name:</strong> {selectedJob.companyName}</p>
                <p className="card-text"> <strong>Location:</strong> {selectedJob.location}</p>
                <p className="card-text"> <strong>Salary:</strong> {selectedJob.salary}</p>
                <p className="card-text"> <strong>Job Type:</strong> {selectedJob.jobType}</p>
                <p className="card-text"> <strong>Description:</strong> {selectedJob.description}</p>
                <p className="card-text"> <strong>Qualifications:</strong> 
                    <ol>
                    {selectedJob.qualifications.map((qlfs) => (
                    <li>{qlfs}</li>
                ))}
                    </ol>
                </p>
            </div>
        </div>
      </main>
    </div>
  )
}

export default JobDetails

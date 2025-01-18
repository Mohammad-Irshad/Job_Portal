import { useEffect, useState } from 'react'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import Header from './components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { deleteJob, getAllJobs } from './app/features/jobsSlice'
import { Link } from 'react-router-dom'


function App() {

  const [filteredJobs, setFilteredJobs] = useState([])

  const dispatch = useDispatch()

  const {jobs, status} = useSelector((state) => state.jobs)

  console.log("All jobs", jobs)

  useEffect(() => {
    dispatch(getAllJobs())
  },[])

  useEffect((state) => {
    setFilteredJobs(jobs)
  },[jobs])

  const handleChange = (e) => {
    const searchTerm = e.target.value.toLowerCase()
    const jobResults = jobs.filter((job) => job.jobTitle.toLowerCase().includes(searchTerm))
    setFilteredJobs(jobResults)
  }

  const handleDelete = (id) => {
      dispatch(deleteJob(id))
  } 


  return (
    <>
      <Header/>
      <main>
        <section className='container my-3 col-md-6'>
          <input type='text' placeholder='Search by job title...' className='form-control' onChange={(e) => handleChange(e)} />
        </section>
        <section className='container'>
          <h3>All Jobs</h3>
          <div className='row'>
          {filteredJobs.length === 0 && <p>Loading...</p>}
          {filteredJobs.length != 0 ? filteredJobs.map((job) => (
              <div className='col-md-4 mb-3' key={job._id}>
                <div class="card">
                  <div className="card-body">
                    <h5 className="card-title">{job.jobTitle}</h5>
                    <p className="card-text"> <strong>Company Name:</strong> {job.companyName}</p>
                    <p className="card-text"> <strong>Location:</strong> {job.location}</p>
                    <p className="card-text"> <strong>Job Type:</strong> {job.jobType}</p>
                    <div className='d-flex justify-content-between'>
                      <Link className='btn btn-primary me-2' to={`/jobDetails/${job._id}`}>See Details</Link>
                      <button className='btn btn-danger' onClick={() => handleDelete(job._id)}>Delete</button>
                    </div>
                  </div>
                </div>
              </div>
          ))

          :

          status === 'success' && <p>No Job is listed right now check after sometime!</p>
        
        }
            
          </div>
        </section>
      </main>
    </>
  )
}

export default App

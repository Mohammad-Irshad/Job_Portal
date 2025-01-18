import React, { useState } from 'react'
import Header from '../components/Header'
import { useDispatch } from 'react-redux'
import { addNewJob } from '../app/features/jobsSlice'

const PostJob = () => {
    const [jobPostData, setJobPostData] = useState({
        jobTitle: "",
        companyName: "",
        location : "",
        salary : 0,
        jobType: "",
        description: "",
        qualifications: []
    })

    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    const dispatch = useDispatch()

    
    const handleChange = (e) => {
        const {name , value} = e.target

        // if(name === 'qualifications'){
        //     let qlfs = value.split('\n').filter((q) => q.trim() !== "")
        //     setJobPostData({...jobPostData, [name] : qlfs})
        //     return
        // }

        setJobPostData({...jobPostData, [name] : value})
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        const processedQualifications = jobPostData.qualifications
        .split('\n')
        .filter((q) => q.trim() !== "")

        const finalJobPostData = { ...jobPostData, qualifications: processedQualifications }

        if(!finalJobPostData.jobTitle || !finalJobPostData.companyName || !finalJobPostData.location || !finalJobPostData.salary || !finalJobPostData.jobType || !finalJobPostData.description || finalJobPostData.qualifications.length === 0){
            setSuccessMessage(null)
            setErrorMessage("All fields are mandatory")
            return 
        }
        console.log(finalJobPostData)
        try{
            const result = await dispatch(addNewJob(finalJobPostData)).unwrap()
            if(result){
                setErrorMessage(null)
                setSuccessMessage("Job Added successfully")
                setJobPostData({
                    jobTitle: "",
                    companyName: "",
                    location: "",
                    salary: "",
                    jobType: "",
                    description: "",
                    qualifications: [],
                })
            }

        }catch(error){
            setErrorMessage(error.response?.data || error.message || "Failed to add Job")
            setSuccessMessage(null)
            console.log("Error :",error)
        }
    }



  return (
    <div>
        <Header/>
        <main className='container'>
            <h3 className='my-3'>Post A Job</h3>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label className='form-label'>Job Title:</label>
                <input type='text' className='form-control' name='jobTitle' value={jobPostData.jobTitle} onChange={(e) => handleChange(e)} />
                <label className='form-label'>Company Name:</label>
                <input type='text' className='form-control' name='companyName' value={jobPostData.companyName} onChange={(e) => handleChange(e)} />
                <label className='form-label'>Location:</label>
                <input type='text' className='form-control' name='location' value={jobPostData.location} onChange={(e) => handleChange(e)} />
                <label className='form-label'>Salary:</label>
                <input type='number' className='form-control' name='salary' value={jobPostData.salary || ""} onChange={(e) => handleChange(e)} />
                <label className='form-label'>Job Type:</label>
                <select className='form-select' name='jobType' value={jobPostData.jobType} onChange={(e) => handleChange(e)}>
                    <option value={''}>Select Job Type</option>
                    <option value={'Full-time (On-site)'}>Full-time (On-site)</option>
                    <option value={'Part-time (On-site)'}>Part-time (On-site)</option>
                    <option value={'Full-time (Remote)'}>Full-time (Remote)</option>
                    <option value={'Part-time (Remote)'}>Part-time (Remote)</option>
                </select>
                <label className='form-label'>Job Description:</label>
                <input type='text' className='form-control' name='description' value={jobPostData.description} onChange={(e) => handleChange(e)} />
                <label className='form-label'>Job Qualifications:</label>
                <textarea className='form-control' name='qualifications' value={jobPostData.qualifications} onChange={(e) => handleChange(e)}></textarea>
                <br/>
                <button type='submit' className='btn btn-primary mb-2'>Post Job</button>
            </form>
            {errorMessage && <p className='text-danger'>{errorMessage}</p>}
            {successMessage && <p className='text-success'>{successMessage}</p>}
        </main>
      
    </div>
  )
}

export default PostJob

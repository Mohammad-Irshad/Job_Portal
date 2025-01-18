import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const addNewJob = createAsyncThunk('job/addNewJob', async (jobData, {rejectWithValue}) => {
    try{
        const response = await axios.post(`http://localhost:3000/addNewJob`, jobData)
        console.log("Added Job : ", response.data)
        return response.data
    }catch(error){
        return rejectWithValue(error.response ? error.response.data : error.message)
    }
})

export const getAllJobs = createAsyncThunk('job/getAllJobs', async () => {
    try{
        const response = await axios.get(`http://localhost:3000/getAllJobs`)
        console.log("All fetched jobs : ",response.data)
        return response.data
    }catch(error){
        return error
    }
})

export const updateJob = createAsyncThunk('job/updateJob', async ({jobId, updatedData}) => {
    try{
        const response = await axios.post(`http://localhost:3000/updateJob/${jobId}`, updatedData)
        console.log("Updated Job : ", response.data)
        return response.data
    }catch(error){
        return error
    }
})

export const deleteJob = createAsyncThunk('job/deleteJob', async (jobId) => {
    try{
        const response = await axios.delete(`http://localhost:3000/deleteJob/${jobId}`)
        console.log("Deleted Job", response.data)
        return response.data
    }catch(error){
        return error
    }
})


export const jobsSlice = createSlice({
    name : "Jobs",
    initialState : {
        jobs : [],
        status : "idel",
        error : false
    },
    reducers : {

    },
    extraReducers : (builder) => {
        builder
        .addCase(addNewJob.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(addNewJob.fulfilled, (state, action) => {
            state.status = 'success'
            state.jobs.push(action.payload.addedJob)
        })
        .addCase(addNewJob.rejected, (state, action) => {
            state.status = 'error',
            state.error = action.payload.message
        })
        .addCase(getAllJobs.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(getAllJobs.fulfilled, (state, action) => {
            state.status = 'success'
            state.jobs = action.payload.allJobs 
        })
        .addCase(getAllJobs.rejected, (state, action) => {
            state.status = 'error',
            state.error = action.payload.message
        })
        .addCase(updateJob.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(updateJob.fulfilled, (state, action) => {
            state.status = 'success'
            const jobIndex = state.jobs.findIndex((job) => job._id === action.payload.updatedJob._id)
            if(jobIndex){
                state.jobs[jobIndex] = action.payload.updatedJob
            }
        })
        .addCase(updateJob.rejected, (state, action) => {
            state.status = 'error',
            state.error = action.payload.message
        })
        .addCase(deleteJob.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(deleteJob.fulfilled, (state, action) => {
            state.status = 'success'
            state.jobs = state.jobs.filter((job) => job._id != action.payload.deletedJob._id)
        })
        .addCase(deleteJob.rejected, (state, action) => {
            state.status = 'error',
            state.error = action.payload.message
        })
    }
})

export default jobsSlice.reducer

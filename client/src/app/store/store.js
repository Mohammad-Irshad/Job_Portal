import { configureStore } from "@reduxjs/toolkit";
import  jobsSlice  from "../features/jobsSlice";


const store = configureStore({
    reducer : {
        jobs : jobsSlice
    }
})

export default store
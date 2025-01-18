import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import PostJob from './pages/PostJob.jsx'
import store from './app/store/store.js'
import {Provider} from 'react-redux'
import JobDetails from './pages/JobDetails.jsx'


const router = createBrowserRouter([
  {
    path : '/',
    element : <App/>
  },
  {
    path : '/postJob',
    element : <PostJob/>
  },
  {
    path : '/jobDetails/:id',
    element : <JobDetails/>
  }
])

createRoot(document.getElementById('root')).render(

  <Provider store={store}>  
    <StrictMode>

      <RouterProvider router={router}>
      </RouterProvider>
      
    </StrictMode>
  </Provider>
)

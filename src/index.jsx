import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom'
import './index.css'
import App from './App'
import About from './pages/About'

const router = createBrowserRouter([
  {
    path:"/",
    element: <App />,
  },
  {
    path:"about",
    element: <About />,
  }
])

ReactDOM.render(
  <RouterProvider router={router}/>,
  document.getElementById('root')
)
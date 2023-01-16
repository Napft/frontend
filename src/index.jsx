import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom'
import './index.css'
import App from './App'
import About from './pages/About'
import MarketPlace from './pages/MarketPlace'
import PersonalPage from './pages/PersonalPage'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "about",
    element: <About />,
  },
  {
    path: "marketplace",
    element: <MarketPlace />,
  },
  {
    path: "personalpage",
    element: <PersonalPage />,
  },
])

ReactDOM.render(
  <RouterProvider router={router} />,
  document.getElementById('root')
)
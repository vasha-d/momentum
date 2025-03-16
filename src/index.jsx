import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './styles/index.css'
import App from './App.jsx'
import BodyOutletRoutes from './BodyOutletRoutes.jsx'
//  API KEY = 9e721fd9-bc1d-427a-90a4-2f3dc54df7f2


const router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>,
    children: BodyOutletRoutes
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)

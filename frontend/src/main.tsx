import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Scan from './components/Scan.tsx'
import Debug from './components/Debug.tsx'
import UserHome from './components/UserHome.tsx'
import Login from './components/Login.tsx'
import ViewReceipt from './components/ViewReceipt.tsx'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/debug',
    element: <Debug />,
  },
  {
    path: '/user-home',
    element: <UserHome />,
  },
  {
    path: '/receipts/:id/image',
    element: <ViewReceipt />,
  },
  {
    path: '/scan',
    element: <Scan />,
  },
])

// TODO: errorElement

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)

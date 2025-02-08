import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Outlet, Link } from 'react-router-dom'
import './index.css'
import Scan from './components/Scan.tsx'
import Debug from './components/Debug.tsx'
import UserHome from './components/UserHome.tsx'
import Login from './components/Login.tsx'
import ViewReceipt from './components/ViewReceipt.tsx'
import Dashboard from './components/Dashboard.tsx'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">Receipt Scanner</Link>
          <div className="space-x-4">
            <Link to="/scan" className="hover:text-gray-600">Scan Receipt</Link>
            <Link to="/user-home" className="hover:text-gray-600">My Receipts</Link>
            <Link to="/login" className="hover:text-gray-600">Login</Link>
          </div>
        </div>
      </nav>
      <main className="container mx-auto p-4">
        <Dashboard />
        <Outlet />
      </main>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
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

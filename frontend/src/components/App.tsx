import { Link, Outlet } from 'react-router-dom'
import Dashboard from './Dashboard'

export default function App() {
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
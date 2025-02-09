import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              payperless
            </Link>
            <div className="ml-6 flex space-x-8">
              <Link
                to="/user-home"
                className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium"
              >
                Receipts
              </Link>
              <Link
                to="/scan"
                className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium"
              >
                Scan
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <Link
              to="/login"
              className="text-gray-900 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation

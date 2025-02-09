import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              PayPerLess
            </Link>
            <div className="ml-6 flex space-x-8">
              <Link
                to="/user-home"
                className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium"
              >
                My Receipts
              </Link>
              <Link
                to="/scan"
                className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium"
              >
                Scan
              </Link>
              <Link
                to="/saved-recipes"
                className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium"
              >
                My Recipes
              </Link>
              <Link
                to="/sustainability"
                className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Eco Points
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
  );
};

export default Navigation; 
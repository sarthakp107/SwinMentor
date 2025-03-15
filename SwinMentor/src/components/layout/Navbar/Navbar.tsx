import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and Brand */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-red-600">
              SwinMentor
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link
              to="/find-mentor"
              className="text-gray-900 hover:text-red-600 px-3 py-2 text-sm font-medium"
            >
              Find Mentor
            </Link>
            <Link
              to="/about"
              className="text-gray-900 hover:text-red-600 px-3 py-2 text-sm font-medium"
            >
              About
            </Link>
            <Link
              to="/login"
              className="text-gray-900 hover:text-red-600 px-3 py-2 text-sm font-medium"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 hover:text-red-600"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/find-mentor"
              className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-red-600"
            >
              Find Mentor
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-red-600"
            >
              About
            </Link>
            <Link
              to="/login"
              className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-red-600"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="block px-3 py-2 text-base font-medium bg-red-600 text-white hover:bg-red-700"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar 
import React from 'react';
import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import sas from '../../assets/logo.png'
import './Header.css';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className='header-container w-full'>
      {/* Navigation */}
      <nav className="w-full bg-white border-b text-transform: uppercase font-sans">
        <div className="mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo Section */}
            <div className="flex-shrink-0 flex items-center">
              <img src={sas} alt="SAS_logo" className="h-40 w-auto" />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-base font-bold">
                Home
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-base font-bold">
                About Us
              </a>
              <div className="relative group">
                <button className="text-transform: uppercase flex items-center text-gray-700 hover:text-gray-900 px-3 py-2 text-base font-bold">
                  Services
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <div className="absolute z-10 left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="py-1">
                    <a href="#" className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100">Service 1</a>
                    <a href="#" className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100">Service 2</a>
                    <a href="#" className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100">Service 3</a>
                  </div>
                </div>
              </div>
              <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-base font-bold">
                Gallery
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-base font-bold">
                Programs
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-base font-bold">
                Awards
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-base font-bold">
                Contact
              </a>
              <button className="bg-green-600 text-white text-transform: uppercase px-4 py-2 rounded-md text-base font-bold hover:bg-blue-700 transition-colors">
                Login
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                {isMenuOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                Home
              </a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                About Us
              </a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                Services
              </a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                Gallery
              </a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                Programs
              </a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                Awards
              </a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                Contact
              </a>
              <button className="w-full text-left bg-blue-600 text-white px-4 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors">
                Login
              </button>
            </div>
          </div>
        )}
      </nav>
      
      {/* Announcements */}
      <div className="max-w-100 px-2.5 py-2.5 sm:px-6 lg:px-8 mx-auto text-center overflow-hidden">
        <span className="scrolling-text items-center text-white text-sm">
            📞 +91-8106064455, 7207111888, 8019242444, 9542491639 &nbsp; | &nbsp; 📧 sriassociates.hyderabad@gmail.com, info@sasenergy.in &nbsp;
        </span>
      </div>
    </header>
  )
}

export default Header


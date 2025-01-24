import React from 'react';
import logo from '../../assets/logo.png'

function Footer() {
  return (
    <div id="webcrumbs"> 
        <div className="bg-white text-green-900 rounded-lg shadow-lg">
    	  <footer className="p-12">
    	    <div className="flex flex-wrap justify-between gap-8 mb-8">
    	      {/* Logo and Company Info */}
    	      <div className="basis-full md:basis-1/3">
    	        <div className="mb-4">
    	          <img
    	            src={logo}
    	            alt="Logo"
    	            className="object-contain w-[300px] h-[140px]"
    	          />
    	        </div>
    	        <p className="text-sm leading-6">
    	          Solar energy’s exceptional synergies with energy storage, electric vehicles, and smart grids means the industry works on the frontline of technology and system change to deliver.
    	        </p>
    	        <div className="flex gap-3 mt-4">
    	          <i className="fa-brands fa-facebook text-lg hover:text-green-500"></i>
    	          <i className="fa-brands fa-twitter text-lg hover:text-green-500"></i>
    	          <i className="fa-brands fa-instagram text-lg hover:text-green-500"></i>
    	          <i className="fa-brands fa-linkedin text-lg hover:text-green-500"></i>
    	        </div>
    	      </div>
    	
    	      {/* Contact Information */}
    	      <div className="basis-full md:basis-1/3">
    	        <h3 className="font-title text-lg mb-4">Contact Information</h3>
    	        <ul className="space-y-3">
    	          <li className="flex items-center gap-2">
    	            <span className="material-symbols-outlined">phone</span>
    	            <span>+91-8106064455, 7207111888, 8019242444, 9542491639</span>
    	          </li>
    	          <li className="flex items-center gap-2">
    	            <span className="material-symbols-outlined">mail</span>
    	            <span>sriassociates.hyderabad@gmail.com, info@sasenergy.in</span>
    	          </li>
    	          <li className="flex items-center gap-2">
    	            <span className="material-symbols-outlined">location_on</span>
    	            <span>#1-4-160/52, Retreat Colony, Loyola College Road, Old Alwal, Secunderabad- 500010, Telangana</span>
    	          </li>
    	        </ul>
    	      </div>
    	
    	      {/* Useful Links */}
    	      <div className="basis-full md:basis-1/3">
    	        <h3 className="font-title text-lg mb-4">Useful Links</h3>
    	        <div className="grid grid-cols-2 gap-4 text-sm">
    	          <a href="#" className="hover:text-green-500">
    	            Our Work
    	          </a>
    	          <a href="#" className="hover:text-green-500">
    	            Quality Management
    	          </a>
    	          <a href="#" className="hover:text-green-500">
    	            Timeline
    	          </a>
    	          <a href="#" className="hover:text-green-500">
    	            Health & Safety
    	          </a>
    	          <a href="#" className="hover:text-green-500">
    	            Image Gallery
    	          </a>
    	          <a href="#" className="hover:text-green-500">
    	            Environmental
    	          </a>
    	          <a href="#" className="hover:text-green-500">
    	            Contact Us
    	          </a>
    	        </div>
    	      </div>
    	    </div>
    	
    	    {/* Newsletter */}
    	    <div className="relative bg-green-500 rounded-md p-6 text-center z-10">
    	      <div className="flex flex-wrap justify-between gap-4 items-center">
    	        <p className="font-title text-lg text-white w-full md:w-auto text-center md:text-left">
    	          <i className="material-symbols-outlined x  text-white">mail</i>Subscribe To Our Newsletter.
    	        </p>
    	        <form className="flex flex-wrap gap-2 w-full md:w-auto max-w-md">
    	          <input 
    	            type="email" 
    	            placeholder="Enter Your Email Address..." 
    	            className="flex-1 px-4 py-2 rounded-md w-full md:w-auto"
    	          />
    	          <button 
    	            type="submit" 
    	            className="bg-green-700 hover:bg-green-600 text-white px-6 py-2 rounded-md w-full md:w-auto"
    	          >
    	            Subscribe
    	          </button>
    	        </form>
    	      </div>
    	    </div>
    	    
    	    {/* Footer Bottom */}
    	    <div className="flex flex-wrap justify-between items-center gap-4 mt-8 text-sm">
    	      <p className="basis-full md:basis-auto text-center md:text-left">© Copyright Sas Energy 2025 | All Rights Reserved. Designed by Shankar Merugu
</p>
    	      <div className="flex gap-4">
    	        <a href="#" className="hover:text-green-500">Privacy Policy</a>
    	        <a href="#" className="hover:text-green-500">Terms & Conditions</a>
    	        <a href="#" className="hover:text-green-500">About Us</a>
    	      </div>
    	    </div>
    	  </footer>
    	</div> 
    </div>
  )
}

export default Footer
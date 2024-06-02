import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-8">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="text-center lg:text-left mb-4 lg:mb-0">
          <h2 className="text-2xl font-semibold">Connect With Us</h2>
          <div className="flex justify-center lg:justify-start mt-2">
            <a href="#" className="text-gray-400 hover:text-white px-2">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white px-2">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white px-2">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
        <div className="text-center lg:text-right">
          <p className="text-gray-400">© 2024 Your Company. All rights reserved.</p>
          <p className="text-gray-400">Designed by Your Name</p>
        </div>
      </div>
    </footer>
  );
};


export default Footer

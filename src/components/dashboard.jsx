import React from 'react';
import "./DashBoard.css"
function DashBoard() {
  return (
    <div>
      <div className="flex flex-col md:flex-row h-screen">
        {/* Sidebar */}
        <div className="bg-gray-100 w-full md:w-1/4 p-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                <i className="fas fa-user text-2xl" />
              </div>
              <div className="ml-4">
                <div className="font-bold text-lg">NAME SURNAME</div>
                <div className="text-gray-600">Male, 25 years</div>
              </div>
            </div>
            <div className="text-green-500 font-bold cursor-pointer">EDIT</div>
          </div>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <div className="text-gray-600">HEIGHT</div>
              <div className="text-gray-600">WEIGHT</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">170 <span className="text-sm">cm</span></div>
              <div className="text-2xl font-bold">70 <span className="text-sm">kg</span></div>
            </div>
          </div>
          <nav className="space-y-4">
            <a href="#" className="flex items-center text-gray-700 hover:text-green-500">
              <i className="fas fa-home mr-2" /> Home
            </a>
            <a href="#" className="flex items-center text-gray-700 hover:text-green-500">
              <i className="fas fa-chart-line mr-2" /> Statistics
            </a>
            <a href="#" className="flex items-center text-gray-700 hover:text-green-500">
              <i className="fas fa-cog mr-2" /> Settings
            </a>
            <a href="#" className="flex items-center text-gray-700 hover:text-green-500">
              <i className="fas fa-users mr-2" /> Join Community
            </a>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="fit bg-gradient-to-r from-pink-500 to-red-500 text-white p-12 rounded-lg flex items-center justify-center">
              <i className="fas fa-dumbbell text-4xl mr-2" />
              <div className="text-2xl font-bold">FITNESS</div>
            </div>
            <div className="bg-gradient-to-r from-yellow-300 to-yellow-500 text-black p-12 rounded-lg flex items-center justify-center">
              <i className="fas fa-brain text-4xl mr-2" />
              <div className="text-2xl font-bold">MENTAL WELLBEING</div>
            </div>
            <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-12 rounded-lg flex items-center justify-center">
              <i className="fas fa-utensils text-4xl mr-2" />
              <div className="text-2xl font-bold">NUTRITION</div>
            </div>
          </div>
          <div className="text-green-500 text-lg font-bold mb-4">TRACK YOUR PROGRESS</div>
          <div className="bg-white border border-gray-300 rounded-lg p-4 h-full">
            {/* Content for tracking progress goes here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AdminContext } from "../context/AdminContext";
import {
  faUsers,
  faChalkboard,
  faCalendarCheck,
  faHome,
  faSignOutAlt,
  faSignInAlt,
  faComments,
} from "@fortawesome/free-solid-svg-icons";

import SideBar from "../components/SideBar";

function AdminPanel() {
    const [showChatbot, setShowChatbot] = useState(false);
    const {aToken, setAToken } = useContext(AdminContext)

    const logout = () => {
       aToken && setAToken('')
       aToken && localStorage.removeItem('aToken')
    }
    
    const toggleChatbot = () => {
      setShowChatbot(!showChatbot);
    }

  return (
    
    <div className="flex min-h-screen font-sans text-gray-800">
      {/* Sidebar */}
       <SideBar />
      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-50">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Admin Panel</h1>
          <div className="flex ">
            <button onClick={logout}  className="bg-primary text-white text-sm px-10 py-2 rounded-full ">
               Logout
            </button>
          </div>
        </header>

        {/* Summary Cards */}
        <section className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
            <FontAwesomeIcon icon={faUsers} className="text-blue-600 text-3xl mb-4" />
            <h3 className="text-2xl font-semibold">120</h3>
            <p className="text-gray-600">Students</p>
          </div>
          {/* Add more summary cards as needed */}
        </section>

        {/* Student Details */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Recent Updates</h2>
          <ul className="space-y-4">
            {[
              { name: "IAT Marks" },
              { name: "Attendance" },
            ].map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md hover:bg-gray-50 transition"
              >
                <span className="font-bold">{item.name}</span>
                <button className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600">
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </section>
      </main>
      
      {/* Chatbot Button */}
      <div 
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:bg-blue-700 transition-colors z-50"
        onClick={toggleChatbot}
      >
        <FontAwesomeIcon icon={faComments} className="text-white text-xl" />
      </div>
      
      {/* Chatbot Container */}
      {showChatbot && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-lg shadow-xl overflow-hidden z-50 border border-gray-200">
          <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
            <h3 className="font-medium">BrightPath Assistant</h3>
            <button onClick={toggleChatbot} className="text-white hover:text-gray-200">
              &times;
            </button>
          </div>
          <iframe 
            src="/BrightPath/chatbot/frontend/index.html" 
            className="w-full h-full border-none"
            title="Chatbot"
          />
        </div>
      )}
    </div>
  );
}

export default AdminPanel;

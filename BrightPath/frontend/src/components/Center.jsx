import React from 'react';
import { useNavigate } from 'react-router-dom';

const Center = () => {
    const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center mt-20 gap-8 rounded-lg bg-blue-50 p-5">
      <button 
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
      >
        Click Below to see Results
        <i className="fas fa-hand-pointer mr-2 rotate-180"></i>
      </button>

      <p onClick={()=>(navigate(`/semesterResult`)) } className="cursor-pointer font-medium text-xl leading-tight text-gray-800 hover:bg-gray-200  hover:text-blue-800 hover:px-6 hover:py-4 hover:rounded-lg transition duration-300 ease-in-out">
        Semester Result NOV/DEC 2024 
        <span className="mx-5 text-sm rounded-full bg-primary px-4 py-3 hover:text-white hover:bg-blue-500 transition  duration-300 ease-in-out">Published!</span>
      </p>
      <p className="cursor-pointer font-medium text-xl leading-tight text-gray-800 hover:bg-gray-200  hover:text-blue-800 hover:px-6 hover:py-4 hover:rounded-lg transition duration-300 ease-in-out">
        Unit Test Marks 
        <span className="mx-5 text-sm rounded-full bg-primary px-4 py-3 hover:text-white hover:bg-blue-500 transition duration-300 ease-in-out">Upcoming!</span>
      </p>
      <p className="cursor-pointer font-medium text-xl leading-tight text-gray-800 hover:bg-gray-200 hover:text-blue-800 hover:px-6 hover:py-4 hover:rounded-lg transition duration-300 ease-in-out">
        Internal Assessment - 1 Marks
        <span className="mx-5 text-sm rounded-full bg-primary px-4 py-3 hover:text-white hover:bg-blue-500  transition duration-300 ease-in-out">Upcoming!</span>
      </p>
    </div>
  );
};

export default Center;
 

import React from 'react';
import SideBar from '../components/SideBar';
import AttendanceManagement from '../components/AttendanceManagement';

const Attendance = () => {
  return (
    <div className="flex min-h-screen font-sans bg-gray-50">
      <SideBar />
      <main className="flex-1 min-w-[350px]">
        <AttendanceManagement />
      </main>
    </div>
  );
};

export default Attendance;

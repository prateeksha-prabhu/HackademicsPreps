import React from 'react';

const Announcement = () => {
  const announcements = [
    {
      id: 1,
      title: 'Upcoming Event: React Workshop',
      date: 'January 25, 2025',
      description: 'Join us for an in-depth workshop on React.js. Learn advanced concepts and hands-on coding!',
    },
    {
      id: 2,
      title: 'System Maintenance Notice',
      date: 'February 1, 2025',
      description: 'Our system will be under maintenance from 12:00 AM to 6:00 AM. Apologies for any inconvenience.',
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Announcements</h1>
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <div
              key={announcement.id}
              className="p-4 bg-blue-100 border-l-4 border-blue-500 rounded-lg"
            >
              <h2 className="text-xl font-semibold text-blue-700">{announcement.title}</h2>
              <p className="text-sm text-gray-600">{announcement.date}</p>
              <p className="text-gray-800 mt-2">{announcement.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Announcement;

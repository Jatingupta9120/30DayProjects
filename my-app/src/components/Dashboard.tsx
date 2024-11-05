import React from 'react';
import { useUser } from '@clerk/clerk-react';

interface DashboardProps {}

export const Dashboard: React.FC<DashboardProps> = () => {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-purple-50 flex flex-col items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-10 w-full max-w-lg">
        <h1 className="text-4xl font-extrabold text-purple-600 mb-6">Dashboard</h1>
        <p className="text-lg text-gray-700 mb-6 font-bold text-purple-800 capitalize">
          Hello {user?.username || user?.firstName}!
        </p>
        <p>Welcome to Jedex99 App, where you can manage your User Authentication with ease.</p>
      </div>
    </div>
  );
};

export default Dashboard;
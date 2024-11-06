import React from 'react';
import { useUser } from '@clerk/clerk-react';
import BackgroundBeams from './ui/background-beams';
import Header from './Header';

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  const { user } = useUser();

  return (
    <div className='min-h-screen bg-black'>
      <BackgroundBeams />
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="bg-black/70 shadow-2xl rounded-xl p-10 w-full max-w-lg backdrop-blur-sm border border-gray-800">
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-6">
            Dashboard
          </h1>
          <p className="text-lg mb-6 font-bold text-white capitalize">
            Hello {user?.username || user?.firstName}!
          </p>
          <div className="space-y-4">
            <p className="text-gray-300">
              Welcome to Jedex99 App, where you can manage your User Authentication with ease.
            </p>
            {/* Add more dashboard content here */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <h3 className="text-purple-400 font-semibold mb-2">Profile</h3>
                <p className="text-sm text-gray-400">Manage your account settings and preferences</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Dashboard as default };
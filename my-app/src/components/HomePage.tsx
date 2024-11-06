import React from 'react';
import Header from './Header';

export const HomePage: React.FC = () => {
  return (
    <div className='bg-black'>
    <Header />
    
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-purple-600 mb-4">Welcome to Jedex99 App</h1>
      <p className="text-lg text-gray-700 mb-2">This is a public homepage that anyone can view.</p>
      <p className="text-md text-gray-600">Please sign in to access more features.</p>
    </div>
    </div>
  );
};

export default HomePage;

import React from 'react';
import Header from './Header';
import BackgroundBeams from './ui/background-beams';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <BackgroundBeams />
      {children}
    </div>
  );
};

import React from 'react';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className="layout-container">
    <Header />
    <main>{children}</main>
  </div>
);

export default Layout;

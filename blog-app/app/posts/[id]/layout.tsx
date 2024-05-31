// components/layout.tsx
import React from 'react';
import { ReactNode } from 'react';
import Link from 'next/link';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen ">

      <main className="flex-grow container mx-auto p-4 h-screen ">
        {children}
      </main>


    </div>
  );
};

export default Layout;

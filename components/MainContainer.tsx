import React from 'react';
import WishingWall from './WishingWall';
import Header from './Header';

const MainContainer: React.FC = () => {
  return (
    <div className="min-h-screen w-full p-8 bg-gradient-radial from-green-500 via-green-300 to-red-200">
      <div className="relative w-full h-full min-h-[calc(100vh-4rem)] bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
        <Header />
        <div className="pt-20">
          <WishingWall />
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <WishingWall />
        </div>
      </div>
    </div>
  );
};

export default MainContainer;


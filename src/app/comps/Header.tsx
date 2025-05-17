'use client';

import React, { useState, useEffect } from 'react';
import logoImage from '../../../assets/LOGO.jpg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import supabase from '@/utils/Supabase';

const Header = () => {
  const [selectedPath, setSelectedPath] = useState('Home');
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const path = window.location.pathname;

    if ((path === '/' || path === '/home') && !path.includes('order')) {
      setSelectedPath('Home');
    } else if (path.includes('menu')) {
      setSelectedPath('Menu');
    } else if (path.includes('reservation')) {
      setSelectedPath('Reservation');
    } else if (path.includes('contact')) {
      setSelectedPath('Contact');
    }
  }, []);

  const getTabClass = (name: string) =>
    selectedPath === name
      ? 'font-bold border-b-2 border-yellow-500 text-yellow-500'
      : 'text-gray-700 cursor-pointer hover:border-b-2 hover:border-yellow-500 hover:text-yellow-500 transition duration-300 ease-in-out';

  const handleNavigation = (path: string, name: string) => {
    router.push(path);
    setSelectedPath(name);
    setMenuOpen(false); // close menu on mobile after click
  };
  //handle supabase logout account
  const handleSupabaseLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Error signing out:', error.message);
    }

    router.push('/');
  }
  const [showLogout, setShowLogout] = useState(false);

  // Handle the click on the person icon
  const handlePersonClick = () => {
    setShowLogout(!showLogout); 
  };


  return (
    <div className="flex items-center justify-between px-[5%] py-4 relative">
      {/* Logo and Title */}
      <div className="flex items-center gap-2">
        <div className="bg-yellow-500 h-[35px] w-[35px] rounded-full relative overflow-hidden">
          <Image src={logoImage} alt="logo" fill className="object-contain" />
        </div>
        <div className="font-bold text-black mix-blend-multiply">Lucille's Kitchenette</div>
      </div>

      {/* Hamburger Icon (Mobile) */}
      <div className="lg:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Nav Links - Desktop */}
      <div className="hidden lg:flex items-center gap-5">
        <div onClick={() => handleNavigation('/user/home', 'Home')} className={getTabClass('Home')}>Home</div>
        <div onClick={() => handleNavigation('/user/menu', 'Menu')} className={getTabClass('Menu')}>Menu</div>
        <div onClick={() => handleNavigation('/user/reservation', 'Reservation')} className={getTabClass('Reservation')}>Reservation</div>
        <div onClick={() => handleNavigation('/user/contact', 'Contact')} className={getTabClass('Contact')}>Contact</div>
      </div>

      {/* Right-side Buttons - Desktop */}
      <div className="hidden lg:flex items-center gap-5 relative">
      <div
        onClick={() => handleNavigation('/user/order', 'Order')}
        className="bg-yellow-500 px-5 py-1 rounded-[30px] font-bold cursor-pointer"
      >
      My  Order
      </div>

      <div className="relative">
        {/* Person Icon */}
        <div
          onClick={handlePersonClick}
          className="bg-yellow-500 h-[30px] w-[30px] rounded-full flex items-center justify-center cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-round">
            <circle cx="12" cy="8" r="5" />
            <path d="M20 21a8 8 0 0 0-16 0" />
          </svg>
        </div>

        {/* Logout Button Overlay */}
        {showLogout && (
          <div className="absolute right-0 mt-2 z-50">
            <button
              onClick={handleSupabaseLogout}
              className="w-28 flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm shadow-md"
            >
              <svg stroke="currentColor" fill="red" strokeWidth="0" viewBox="0 0 512 512" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg">
                <path d="M312 372c-7.7 0-14 6.3-14 14 0 9.9-8.1 18-18 18H94c-9.9 0-18-8.1-18-18V126c0-9.9 8.1-18 18-18h186c9.9 0 18 8.1 18 18 0 7.7 6.3 14 14 14s14-6.3 14-14c0-25.4-20.6-46-46-46H94c-25.4 0-46 20.6-46 46v260c0 25.4 20.6 46 46 46h186c25.4 0 46-20.6 46-46 0-7.7-6.3-14-14-14z"></path>
                <path d="M372.9 158.1c-2.6-2.6-6.1-4.1-9.9-4.1-3.7 0-7.3 1.4-9.9 4.1-5.5 5.5-5.5 14.3 0 19.8l65.2 64.2H162c-7.7 0-14 6.3-14 14s6.3 14 14 14h256.6L355 334.2c-5.4 5.4-5.4 14.3 0 19.8l.1.1c2.7 2.5 6.2 3.9 9.8 3.9 3.8 0 7.3-1.4 9.9-4.1l82.6-82.4c4.3-4.3 6.5-9.3 6.5-14.7 0-5.3-2.3-10.3-6.5-14.5l-84.5-84.2z"></path>
              </svg>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>


      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-[70px] left-0 w-full bg-white px-[5%] py-4 flex flex-col gap-4 shadow-md z-10 lg:hidden">
          <div onClick={() => handleNavigation('/user/home', 'Home')} className={getTabClass('Home')}>Home</div>
          <div onClick={() => handleNavigation('/user/menu', 'Menu')} className={getTabClass('Menu')}>Menu</div>
          <div onClick={() => handleNavigation('/user/reservation', 'Reservation')} className={getTabClass('Reservation')}>Reservation</div>
          <div onClick={() => handleNavigation('/user/contact', 'Contact')} className={getTabClass('Contact')}>Contact</div>
          <div className="flex space-x-16">
            <div onClick={() => handleNavigation('/user/order', 'Order')} className="bg-yellow-500 px-5 py-1 rounded-[30px] font-bold cursor-pointer w-fit">My Order</div>
            <button
                onClick={handleSupabaseLogout}
                className="w-28 flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm shadow-md"
              >
                <svg stroke="currentColor" fill="red" strokeWidth="0" viewBox="0 0 512 512" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg">
                  <path d="M312 372c-7.7 0-14 6.3-14 14 0 9.9-8.1 18-18 18H94c-9.9 0-18-8.1-18-18V126c0-9.9 8.1-18 18-18h186c9.9 0 18 8.1 18 18 0 7.7 6.3 14 14 14s14-6.3 14-14c0-25.4-20.6-46-46-46H94c-25.4 0-46 20.6-46 46v260c0 25.4 20.6 46 46 46h186c25.4 0 46-20.6 46-46 0-7.7-6.3-14-14-14z"></path>
                  <path d="M372.9 158.1c-2.6-2.6-6.1-4.1-9.9-4.1-3.7 0-7.3 1.4-9.9 4.1-5.5 5.5-5.5 14.3 0 19.8l65.2 64.2H162c-7.7 0-14 6.3-14 14s6.3 14 14 14h256.6L355 334.2c-5.4 5.4-5.4 14.3 0 19.8l.1.1c2.7 2.5 6.2 3.9 9.8 3.9 3.8 0 7.3-1.4 9.9-4.1l82.6-82.4c4.3-4.3 6.5-9.3 6.5-14.7 0-5.3-2.3-10.3-6.5-14.5l-84.5-84.2z"></path>
                </svg>
                Logout
              </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;

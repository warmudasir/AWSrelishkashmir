"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';  
import { getUserToken } from "../../../utility/authtoken";
import s from './header.module.scss';
import cn from "classnames";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = getUserToken();
      setUserData(user);
    } else {
      setUserData(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserData(null);
    router.push('/login');
  };

  return (
      <nav className="fixed top-0 left-0 w-full z-20 bg-opacity-70 py-4" style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
        <div className="flex justify-between items-center w-full px-4">
          <div><Link href={"/"}><h1 className="text-white">Relish Kashmir</h1></Link></div>
          <div className={cn(s["Header__nav-links"])}>
            <Link href="/about" className="text-white hover:text-gray-300">About</Link>
            <Link href="/shop" className="text-white hover:text-gray-300">Shop here</Link>
            {userData ? (
              <button onClick={handleLogout} className="text-white hover:text-gray-300">Logout</button>
            ) : (
              <Link href="/login" className="text-white hover:text-gray-300">Login</Link>
            )}
          </div>
        </div>
      </nav>
  );
};

export default Header;

"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import logo3 from "../../../images/logot.png";
import cartlogo from "../../../images/cartlogo.svg";
import userlogo from "../../../images/user-solid.svg";
import Link from 'next/link';
import { useRouter } from 'next/navigation';  
import { getUserToken } from "../../utility/authtoken";
import styles from './header.module.scss';
import { useContext } from 'react';
import { ProductContext } from '../../context/productcontext';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const userData = getUserToken(); // This will determine if the user is logged in

  const handleLogout = () => {
    localStorage.removeItem('token');  // Remove the user token
    router.push('/login');  // Redirect to login page
  };

  return (
    <>
    <div className={styles.header}>
      <div className={styles.topBar}>
        <div className={styles.logo}>
          <Image
            src={logo3}
            alt="Center Logo"
            width={200}
          />
        </div>
        <div className={styles.icons}>
          <Image
            src={cartlogo}
            alt="Cart Logo"
            width={25}
            className={styles.showOnDesktop}
          />
          <Image
            src={userlogo}
            alt="User Logo"
            width={25}
            className={styles.showOnDesktop}
          />
          <div className={styles.userName}>
          <h2 >
  {userData && userData.firstName ? userData.firstName : ''}
</h2>

          </div>
        </div>
        <div className={styles.hamburgerMenu}>
          <input type="checkbox" id="menu-toggle" checked={menuOpen} onChange={() => setMenuOpen(!menuOpen)} />
          <label htmlFor="menu-toggle" className={styles.menuIcon}>
            <div></div>
            <div></div>
            <div></div>
          </label>
        </div>
      </div>

      <nav className={`${styles.nav} ${menuOpen ? styles.showMenu : ''}`}>
        <ul>
          <li><Link href="/">All</Link></li>
          <li><Link href="/myorders">My Orders</Link></li>
          {userData?.email ? (
            <>
              <li onClick={handleLogout}>Logout</li>
            </>
          ) : (
            <li><Link href="/login">Login</Link></li>
          )}
        </ul>
      </nav>
    </div>
    <div style={{height:'45px'}}></div>
    </>
  );
};

export default Header;

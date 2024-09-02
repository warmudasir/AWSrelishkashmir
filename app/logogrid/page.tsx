import React from 'react';
import styles from './logogrid.module.scss';
import Image from 'next/image';
import spices from "../../public/spices.jpg"

const LogoGrid = () => {
  return (
    <>
    <div style={{position:'relative',textAlign:'center'}}>
      <Image src={spices} alt='spices'>
    
      </Image>
      <h2 className={styles['heading']}>
      We're all about the culture and cuisine
    </h2>
    </div>
    <div className={styles['grid-container']}>
      <div className={styles['grid-item']}>
        <img src="/logo2.png" alt="Logo 1"  style={{height:'80px'}}/>
        <h2 style={{color:"#990000"}}>24x7 Customer Support</h2>
        <p style={{color:'black'}}>Get in touch with us via live chat or mail for any queries</p>
      </div>
      <div className={styles['grid-item']}>
        <img src="/logo3.png" alt="Logo 2"  style={{height:'80px'}}/>
        <h2 style={{color:"#990000"}}>100% Secure Checkout</h2>
        <p style={{color:'black'}}>Your payments are secure with PCI Compliant payment gateway</p>
      </div>
      <div className={styles['grid-item']}>
        <img src="/logo4.png" alt="Logo 3"  style={{height:'80px'}}/>
        <h2 style={{color:"#990000"}}>Geniune quality  Products</h2>
        <p style={{color:'black'}}>Get the best and Original Products Cultivated in lush green lands of kashmir</p>
      </div>
      <div className={styles['grid-item']}>
        <img src="/logo1.png" alt="Logo 4"   style={{height:'80px'}}/>
        <h2 style={{color:"#990000"}}>Shipping all over India</h2>
        <p style={{color:'black'}}>We currently ship our products all over the India.</p>
      </div>
    </div>
    </>
  );
};

export default LogoGrid;

import React from 'react';
import s from './logogrid.module.scss';
import Image from 'next/image';
import spices from "../../public/spices.jpg"

const LogoGrid = () => {
  return (
    <>
    <div style={{position:'relative',textAlign:'center'}}>
      <Image src={spices} alt='spices'/>
      <h2 className={s['LogoGrid__heading']}>
      We&apos;re all about the culture and cuisine
    </h2>
    </div>
    <div className={s['LogoGrid__container']}>
      <div className={s['LogoGrid__container_item']}>
        <Image src="/logo2.png" alt="Logo 1"  height={80} width={100} className={s["LogoGrid__container_image"]}/>
        <p className={s["LogoGrid__container_item_heading"]} >24x7 Customer Support</p>
        <p className={s["LogoGrid__container_item_description"]}>Get in touch with us via live chat or mail for any queries</p>
      </div>
      <div className={s['LogoGrid__container_item']}>
        <Image src="/logo3.png" alt="Logo 2"   height={80} width={100}  className={s["LogoGrid__container_image"]}/>
        <p className={s["LogoGrid__container_item_heading"]} >100% Secure Checkout</p>
        <p className={s["LogoGrid__container_item_description"]}>Your payments are secure with PCI Compliant payment gateway</p>
      </div>
      <div className={s['LogoGrid__container_item']}>
        <Image src="/logo4.png" alt="Logo 3"  height={80} width={100}  className={s["LogoGrid__container_image"]}/>
        <p className={s["LogoGrid__container_item_heading"]} >Geniune quality  Products</p>
        <p className={s["LogoGrid__container_item_description"]}>Get the best and Original Products Cultivated in lush green lands of kashmir</p>
      </div>
      <div className={s['LogoGrid__container_item']}>
        <Image src="/logo1.png" alt="Logo 4"    height={80} width={100}  className={s["LogoGrid__container_image"]}/>
        <p className={s["LogoGrid__container_item_heading"]} >Shipping all over India</p>
        <p className={s["LogoGrid__container_item_description"]}>We currently ship our products all over the India.</p>
      </div>
    </div>
    </>
  );
};

export default LogoGrid;

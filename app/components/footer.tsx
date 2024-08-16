import React from 'react';
import Image from 'next/image';
import facebook from "../../images/facebook-brands-solid.svg";
import instagram from "../../images/instagram-brands-solid.svg";
import youtube from "../../images/youtube-brands-solid.svg";
import styles from './footer.module.scss'; // Adjust the path as needed

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.socialIcons}>
        <Image src={instagram} alt="Instagram" width={40} />
        <Image src={facebook} alt="Facebook" width={40} />
        <Image src={youtube} alt="YouTube" width={40} />
      </div>
      <div className={styles.horizontalLine}>
        <hr />
      </div>
      <div className={styles.footerSections}>
        <div>
          <ul>
            <li><h2>BE THE FIRST TO KNOW</h2></li>
            <li><p>Get to Know more about Relish Kashmir</p></li>
            <li><input type='email' placeholder='Email' /></li>
            <li><button>Subscribe</button></li>
          </ul>
        </div>
        <div>
          <ul>
            <li><h2>Contact Us</h2></li>
            <li>support@relishKashmir.com</li>
            <li>+91-9797352800</li>
          </ul>
        </div>
        <div>
          <ul>
            <li><h2>Support</h2></li>
            <li>Contact Us</li>
            <li>Shipping Status</li>
            <li>Frequently Asked Questions</li>
          </ul>
        </div>
        <div>
          <ul>
            <li><h2>About Relish Kashmir</h2></li>
            <li>Jobs</li>
            <li>Wholesale</li>
            <li>Blog</li>
            <li>Admin</li>
          </ul>
        </div>
      </div>
      <div className={styles.horizontalLine}>
        <hr />
      </div>
      <div className={styles.footerBottom}>
        <p>Proprietor: Shayeeb Mohammad War</p>
        <h1>&copy; All rights reserved 2023-24</h1><br />
        <p><i>Designed and Developed by :  Mohammad Mudasir  : warmudasir095@gmail.com</i></p>
      </div>
    </div>
  );
}

export default Footer;

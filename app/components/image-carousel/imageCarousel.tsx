"use client";
import React, { useState, useEffect } from 'react';
import styles from './ImageCarousel.module.scss';

const images = [
  // "/chk.svg",
  // "main.jpg",
  "/RelishKashmir.png",
  "Rk2.png"
];

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // 4 seconds interval

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className={styles.carouselContainer}>
      {images.map((image, index) => (
        <div
          key={index}
          className={`${styles.carouselImage} ${
            index === currentIndex ? styles.active : ''
          }`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}
      <button className={styles.leftButton} onClick={goToPrevious}>
        &#10094;
      </button>
      <button className={styles.rightButton} onClick={goToNext}>
        &#10095;
      </button>
    </div>
  );
};

export default ImageCarousel;

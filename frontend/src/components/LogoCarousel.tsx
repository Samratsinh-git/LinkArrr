// LogoCarousel.js
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const logos = [
  "https://picsum.photos/100", // replace these with your logo URLs
  "https://picsum.photos/100",
  "https://picsum.photos/100",
  "https://picsum.photos/100",
  "https://picsum.photos/100",
];

const LogoCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(2); // Start with the center index

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % logos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        width: "100%",
      }}
    >
      {logos.map((logo, index) => {
        const isCenter = index === currentIndex;
        const size = isCenter ? 150 : 100; // Adjust size for centered image
        const zIndex = isCenter ? 1 : 0;

        return (
          <motion.div
            key={index}
            animate={{
              opacity: isCenter ? 1 : 0.5,
              filter: isCenter ? "none" : "blur(4px)",
              scale: isCenter ? 1.2 : 1,
            }}
            transition={{ duration: 0.5 }}
            style={{ margin: "0 20px", zIndex }}
          >
            <img
              src={logo}
              alt={`logo-${index}`}
              style={{ width: size, height: size }}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default LogoCarousel;

import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";

const PixelStars = ({ count = 20 }) => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generateStars = () => {
      return Array.from({ length: count }).map(() => ({
        id: crypto.randomUUID(),
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 3}s`,
      }));
    };
    setStars(generateStars());
  }, [count]);

  return (
    <>
      {stars.map((star) => (
        <FaStar  
          key={star.id}
          className="absolute fill-yellow-400 rounded-none opacity-75 animate-[twinkle_2s_infinite]"
          style={{
            left: star.left,
            top: star.top,
            animationDelay: star.delay,
          }}
        />
      ))}
    </>
  );
};

export default PixelStars;

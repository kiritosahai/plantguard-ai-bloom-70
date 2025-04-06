
import React from "react";

const PlantHeroImg = () => {
  return (
    <div className="relative w-full max-w-md">
      <div className="w-full aspect-square relative plant-shadow">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 512 512"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-float"
        >
          {/* Plant pot */}
          <path
            d="M160 352H352L384 448H128L160 352Z"
            fill="#8D6E63"
            stroke="#6D4C41"
            strokeWidth="8"
          />
          
          <ellipse
            cx="256"
            cy="352"
            rx="96"
            ry="16"
            fill="#6D4C41"
          />
          
          {/* Plant base */}
          <path
            d="M256 352C256 352 224 256 256 192C288 256 256 352 256 352Z"
            fill="#43A047"
            stroke="#2E7D32"
            strokeWidth="4"
          />
          
          {/* Plant leaves */}
          <path
            d="M256 320C256 320 352 288 384 208C288 240 256 320 256 320Z"
            fill="#66BB6A"
            stroke="#43A047"
            strokeWidth="4"
          />
          
          <path
            d="M256 320C256 320 160 288 128 208C224 240 256 320 256 320Z"
            fill="#66BB6A"
            stroke="#43A047"
            strokeWidth="4"
          />
          
          <path
            d="M256 256C256 256 288 192 352 160C304 208 256 256 256 256Z"
            fill="#81C784"
            stroke="#43A047"
            strokeWidth="4"
          />
          
          <path
            d="M256 256C256 256 224 192 160 160C208 208 256 256 256 256Z"
            fill="#81C784"
            stroke="#43A047"
            strokeWidth="4"
          />
          
          <path
            d="M256 224C256 224 256 160 224 96C272 144 256 224 256 224Z"
            fill="#4CAF50"
            stroke="#2E7D32"
            strokeWidth="4"
          />
          
          <path
            d="M256 192C256 192 288 144 320 96C272 144 256 192 256 192Z"
            fill="#81C784"
            stroke="#43A047"
            strokeWidth="4"
          />
          
          <path
            d="M256 192C256 192 224 144 192 96C240 144 256 192 256 192Z"
            fill="#81C784"
            stroke="#43A047"
            strokeWidth="4"
          />
          
          {/* Small decorative details */}
          <circle cx="290" cy="260" r="6" fill="#AED581" />
          <circle cx="220" cy="280" r="6" fill="#AED581" />
          <circle cx="270" cy="220" r="6" fill="#AED581" />
        </svg>
      </div>
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-40 h-8 bg-black/10 blur-md rounded-full"></div>
    </div>
  );
};

export default PlantHeroImg;

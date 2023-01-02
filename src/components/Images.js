import React from "react";
import Image from "./Image";

function Images({ images }) {
  return (
    <div className="images-container">
      {images.map((image, index) => {
        const randNumber = Math.floor(Math.random() * images.length);

        if (randNumber === index) {
          return <Image key={index} image={image} randNumber />;
        } else {
          return <Image key={index} image={image} />;
        }
      })}
    </div>
  );
}

export default Images;

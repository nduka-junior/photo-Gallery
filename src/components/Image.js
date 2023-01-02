import React from 'react';


function Image({ image, randNumber }) {
  return (
    <>
      {randNumber ? (
        <div className="grid-col-span">
          <a href={image.url} target="_blank">
            <img src={image.src.large} alt={image.alt} />
          </a>
          <div className="image-title" style={{ backGroundColor: "black" }}>
            <h3>{image.alt}</h3>
            <h3> by {image.photographer}</h3>
          </div>
        </div>
      ) : (
        <div className="grid-rand-span">
          <a href={image.url} target="_blank">
            <img src={image.src.large} alt={image.alt} />
            <div className="image-title">
              <h3>{image.alt}</h3>
              <h3>by {image.photographer}</h3>
            </div>
          </a>
        </div>
      )}
    </>
  );
}

export default Image
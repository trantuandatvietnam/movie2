import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const handleDragStart = (e) => e.preventDefault();

const items = [
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Information_example_page_300px.jpg"
    onDragStart={handleDragStart}
  />,
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Information_example_page_300px.jpg"
    onDragStart={handleDragStart}
  />,
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Information_example_page_300px.jpg"
    onDragStart={handleDragStart}
  />,
];

const Gallery = ({ media_type }) => {
  console.log(media_type);
  return (
    <AliceCarousel
      disableButtonsControls={true}
      disableDotsControls
      mouseTracking
      items={items}
    />
  );
};

export default Gallery;

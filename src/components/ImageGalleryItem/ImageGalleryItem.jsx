import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ src, largeImageURL, tags, onClick }) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        src={src}
        alt={tags}
        onClick={() => onClick(largeImageURL)}
        className={css.ImageGalleryItemImage}
      />
    </li>
  );
};
export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  src: PropTypes.string,
  largeImageURL: PropTypes.string,
  alt: PropTypes.string,
  onClick: PropTypes.func,
};

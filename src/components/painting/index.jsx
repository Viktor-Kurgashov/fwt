import React from 'react';
import propTypes from 'prop-types';
import './style.css';

const Painting = ({ item }) => {
  return (
    <div className="painting" style={{ backgroundImage: `url('${item.imageUrl}')` }}>
      <div className="painting__caption-mount">
        <div className="painting__caption">
          <h3>{item.name}</h3>
          <p><b>Author:</b> {item.author}</p>
          <p><b>Created:</b> {item.created}</p>
          <p><b>Location:</b> {item.location}</p>
        </div>
      </div>
    </div>
  )
};

Painting.propTypes = {
  item: propTypes.object.isRequired,
};

export default React.memo(Painting);
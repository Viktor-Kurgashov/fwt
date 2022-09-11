import React from 'react';
import propTypes from 'prop-types';
import './style.css';

const List = ({ items, render }) => {
  return (
    <ul className='list'>
      {items.map(item =>
        <li key={item.id} className='list__item'>{render(item)}</li>
      )}
    </ul>
  )
};

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  render: propTypes.func.isRequired,
};

export default React.memo(List);
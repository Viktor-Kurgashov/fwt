import React, { Children } from 'react';
import propTypes from 'prop-types';
import './style.css';

const LayoutFilter = ({ children }) => {
  const arrayChildren = Children.toArray(children);

  return (
    <ul className='layout-filters'>
      {Children.map(arrayChildren, child =>
        <li className='layout-filters__item'>{child}</li>
      )}
    </ul>
  )
};

LayoutFilter.propTypes = {
  children: propTypes.node,
};

export default React.memo(LayoutFilter);
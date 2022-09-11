import React from 'react';
import propTypes from 'prop-types';
import './style.css';

const LayoutMain = ({ children, loading }) => {
  return (
    <main className='layout-main'>
      {children}
      {loading && <div className='layout-main__loader' />}
    </main>
  )
};

LayoutMain.propTypes = {
  children: propTypes.node,
  loading: propTypes.bool,
};

export default React.memo(LayoutMain);
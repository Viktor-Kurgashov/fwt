import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ReactComponent as ThemeBtn } from './assets/theme-btn.svg';
import './style.css';

const Header = () => {
  const dispatch = useDispatch();

  const toggleTheme = useCallback(() => {
    dispatch({ type: 'catalog/toggle-theme' });
  }, [dispatch]);

  return (
    <header className='header'>
      <Link className='header__logo-link' to='/'></Link>

      <button className='header__theme-btn' onClick={toggleTheme}>
        <ThemeBtn />
      </button>
    </header>
  )
};

export default React.memo(Header);
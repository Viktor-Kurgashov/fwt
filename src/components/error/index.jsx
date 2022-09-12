import React from 'react';
import { useNavigate } from 'react-router-dom';
import propTypes from 'prop-types';
import './style.css';

// компонент для сообщений об ошибке при загрузке картин
//
const Error = ({ title, refresh, back }) => {
  const navigate = useNavigate();

  return (
    <div className='error'>
      <h3 className='error__title'>{title}</h3>

      {back && <button className='error__btn' onClick={() => navigate(-1)}>Вернуться назад</button>}

      {refresh && <button className='error__btn' onClick={() => navigate(0)}>Обновить страницу</button>}
    </div>
  )
};

Error.propTypes = {
  title: propTypes.string,
  back: propTypes.bool, // показать кнопку "назад"
  refresh: propTypes.bool, // показать кнопку "обновить"
};

Error.defaultProps = {
  title: 'Что-то пошло не так',
  refresh: false,
  back: false,
};

export default React.memo(Error);
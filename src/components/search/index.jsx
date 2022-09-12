import React, { useState, useEffect, useCallback } from 'react';
import propTypes from 'prop-types';
import './style.css';

const Search = ({ value, update, placeholder }) => {
  const [timerId, setTimerId] = useState(undefined);
  const [innerValue, setInnerValue] = useState('');

  useEffect(() => setInnerValue(value), [value]);

  const callbacks= {
    delayUpdate: useCallback(event => {
      // сброс таймера отложенного поиска
      clearTimeout(timerId);
      // обновление внутреннего значения
      setInnerValue(event.target.value);
      const newValue = event.target.value.trim();
      // поиск очищен backspase'ом
      if (!newValue && value) setTimerId(setTimeout(() => update(''), 2000));
      // просто поиск, сделано чтобы не отправлять одни пробелы
      else if (newValue !== value) setTimerId(setTimeout(() => update(newValue), 2000));
    }, [timerId, value, update]),

    onBlur: useCallback(event => {
      setInnerValue(event.target.value.trim());
    }, []),

    clear: useCallback(() => {
      update('');
    }, [update]),
  };

  return (
    <label className='search'>
      <input
        value={innerValue}
        onChange={callbacks.delayUpdate}
        onBlur={callbacks.onBlur}
        placeholder={placeholder}
        className="search__input"
      />
      {value && <button className="search__clear-btn" onClick={callbacks.clear} />}
    </label>
  )
};

Search.propTypes = {
  value: propTypes.string,
  update: propTypes.func,
  placeholder: propTypes.string,
};

export default React.memo(Search);
import React, { useState, useEffect, useCallback } from 'react';
import propTypes from 'prop-types';
import './style.css';

const Search = ({ value, update, placeholder }) => {
  const [timerId, setTimerId] = useState(undefined);
  const [innerValue, setInnerValue] = useState('');

  useEffect(() => setInnerValue(value), [value]);

  const callbacks= {
    delayUpdate: useCallback(event => {
      clearTimeout(timerId);
      setInnerValue(event.target.value);
      const newValue = event.target.value.trim();
      if (!newValue && value) setTimerId(setTimeout(() => update(''), 2000));
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
import React, { useState, useEffect, useCallback } from 'react';
import { useDropdownCloseListener } from '../utils';
import propTypes from 'prop-types';
import './style.css';



const Select = ({ data, value, update, placeholder }) => {
  const [opened, setOpened] = useState(false);
  const [title, setTitle] = useState('');
  // хук для закрытия выпадающих селектов при клике за их пределами
  const closeListener = useDropdownCloseListener('.custom-select', () => setOpened(false));

  // обновляет заголовок кастомного селекта, при обновлении стора, после поиска
  useEffect(() => setTitle(
    (data.length && value) ? data.find(item => item.id.toString() === value).value : false
  ), [data, value]);

  // снимает eventListener для закрытия выпадашки, зачем-то)
  useEffect(() => () => closeListener.remove(), []);



  const callbacks = {
    select: useCallback(event => {
      if (event.target.value !== value) {
        // переключение фильтра в родительском компоненте
        update(event.target.value);
        // закрыть выпадающий селект
        setOpened(false);
        // снимает eventListener закрытия выпадашки
        closeListener.remove();
      }
    }, [value, update, closeListener]),

    clear: useCallback(() => {
      update('');
      setOpened(false);
    }, [update]),

    toggleList: useCallback(() => {
      if (opened) {
        setOpened(false);
        closeListener.remove();
      } else {
        setOpened(true);
        closeListener.add();
      }
    }, [opened, closeListener]),
  };



  return (
    <div className="custom-select">
      <button onClick={callbacks.toggleList} className={opened
        ? "custom-select__toggle-btn txt-elps custom-select__toggle-btn--opened"
        : "custom-select__toggle-btn txt-elps"
      }>{title ? title : placeholder}</button>

      {value && <button className="custom-select__clear-btn" onClick={callbacks.clear} />}

      {opened && <div className="custom-select__list">
        {data.map(item =>
          <button key={item.id}
            value={item.id}
            onClick={callbacks.select}
            className={item.id === value
              ? "custom-select__option txt-elps custom-select__option--selected"
              : "custom-select__option txt-elps"
          }>{item.value}</button>
        )}
      </div>}
    </div>
  )
};



Select.propTypes = {
  data: propTypes.arrayOf(propTypes.object),
  value: propTypes.string,
  update: propTypes.func,
  placeholder: propTypes.string,
};

export default React.memo(Select);
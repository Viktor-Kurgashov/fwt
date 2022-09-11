import React, { useState, useEffect, useCallback } from 'react';
import { useDropdownCloseListener } from '../utils';
import propTypes from 'prop-types';
import './style.css';



const DropdownRange = ({ from, to, updateFrom, updateTo, clearRange }) => {
  const [opened, setOpened] = useState(false);

  const closeListener = useDropdownCloseListener('.dropdown-range', () => setOpened(false));

  const [state, setState] = useState({
    timerFrom: null,
    innerFrom: '',
    timerTo: null,
    innerTo: '',
  });

  useEffect(() => setState(prev => ({ ...prev, innerFrom: from, })), [from]);

  useEffect(() => setState(prev => ({ ...prev, innerTo: to, })), [to]);



  const callbacks = {
    toggleList: useCallback(() => {
      if (opened) {
        setOpened(false);
        closeListener.remove();
      } else {
        setOpened(true);
        closeListener.add();
      }
    }, [opened, closeListener]),

    delayUpdateFrom: useCallback(event => {
      clearTimeout(state.timerFrom);
      setState(current => ({
        ...current,
        innerFrom: event.target.value,
        timerFrom: setTimeout(() => {
          updateFrom(event.target.value);
          setOpened(false);
        }, 2000),
      }))
    }, [state, updateFrom]),

    delayUpdateTo: useCallback(event => {
      clearTimeout(state.timerTo);
      setState(current => ({
        ...current,
        innerTo: event.target.value,
        timerTo: setTimeout(() => {
          updateTo(event.target.value);
          setOpened(false);
        }, 2000),
      }))
    }, [state, updateTo]),
  };



  return (
    <div className="dropdown-range">
      <button onClick={callbacks.toggleList} className={opened
        ? "dropdown-range__toggle-btn dropdown-range__toggle-btn--opened"
        : "dropdown-range__toggle-btn"
      }>Created</button>

      {(from || to) && <button className="dropdown-range__clear-btn" onClick={clearRange} />}

      {opened && <div className="dropdown-range__list dropdown__content">
        <input
          value={state.innerFrom}
          onChange={callbacks.delayUpdateFrom}
          className="dropdown-range__input"
          placeholder="from"
        />
        <input
          value={state.innerTo}
          onChange={callbacks.delayUpdateTo}
          className="dropdown-range__input"
          placeholder="to"
        />
      </div>}
    </div>
  )
};



DropdownRange.propTypes = {
  from: propTypes.string,
  to: propTypes.string,
  updateFrom: propTypes.func,
  updateTo: propTypes.func,
  clearRange: propTypes.func,
};

export default React.memo(DropdownRange);
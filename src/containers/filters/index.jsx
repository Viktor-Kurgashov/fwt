import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import actionsFilterOptions from '../../store/filterOptions/actions';
import { toggleFilter, clearRange } from './utils'; // функции для переключения фильтра

import LayoutFilters from '../../layouts/layout-filters';
import Search from '../../components/search';
import Select from '../../components/select';
import Range from '../../components/range';



const Filters = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const select = useSelector(state => ({
    options: state.filterOptions,
    params: state.filterParams,
    pathname: state.pagination.pathname,
  }));

  // переключение параметров фильтра, просто перенаправляют на новый роут
  // где уже загружаются картины и сохраняются параметры фильтра в стор
  const callbacks = {
    toggleFilter: useCallback((param, value) => {
      navigate(select.pathname + toggleFilter(location.search, param, value));
    }, [location]),

    clearRange: useCallback(() => {
      navigate(select.pathname + clearRange(location.search));
    }, [location]),
  };

  useEffect(() => { // загрузка опций select'ов
    dispatch(actionsFilterOptions.fetchAuthors());
    dispatch(actionsFilterOptions.fetchLocations());
  }, [dispatch]);



  return (
    <LayoutFilters>
      <Search
        value={select.params.q}
        update={value => callbacks.toggleFilter('q', value)}
        placeholder='Name'
      />
      <Select
        data={select.options.authors.items}
        value={select.params.authorId}
        update={id => callbacks.toggleFilter('authorId', id)}
        placeholder='Author'
      />
      <Select
        data={select.options.locations.items}
        value={select.params.locationId}
        update={id => callbacks.toggleFilter('locationId', id)}
        placeholder='Location'
      />
      <Range
        from={select.params.created_gte}
        to={select.params.created_lte}
        updateFrom={value => callbacks.toggleFilter('created_gte', value)}
        updateTo={value => callbacks.toggleFilter('created_lte', value)}
        clearRange={callbacks.clearRange}
      />
    </LayoutFilters>
  )
};

export default React.memo(Filters);
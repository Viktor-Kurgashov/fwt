import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import actionsFilterParams from '../../store/filterParams/actions';
import actionsCatalog from '../../store/catalog/actions';

import LayoutMain from '../../layouts/layout-main';
import Filters from '../filters';
import List from '../../components/list';
import Painting from '../../components/painting';
import Pagination from '../../components/pagination';
import Error from '../../components/error';



const Main = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const select = useSelector(state => ({
    fetchState: state.catalog.fetchState,
    pageItems: state.catalog.pageItems,
    paginationLinks: state.pagination.links,
    dependiesLoaded: state.filterOptions.dependiesLoaded,
  }));

  // извлекает параметры фильтра из route, сохраняет в соответсвующий стор
  useEffect(() => {
    dispatch(actionsFilterParams.handleRoute(location.search));
  }, [location, dispatch]);

  // загрузка картин на странице, не начинается пока не загружены authors
  // и locations, необходимые для обработки массива картин
  useEffect(() => {
    if (select.dependiesLoaded) dispatch(actionsCatalog.fetchPageItems(location.search));
  }, [select.dependiesLoaded, location, dispatch]);

  const renders = {
    // функция рендера, которая передаётся в компонент списка
    painting: useCallback(item => (<Painting item={item} />), []),
  };



  return (
    <LayoutMain loading={select.fetchState.loading}>
      <Filters />
      {select.fetchState.empty ? <Error title='Ничего не найдено' back />
        : select.fetchState.error ? <Error title='Ошибка при загрузке' refresh />
        : <>
          <List items={select.pageItems} render={renders.painting} />
          <Pagination links={select.paginationLinks} />
        </>}
    </LayoutMain>
  )
};

export default React.memo(Main);
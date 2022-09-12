const actionsFilterParams = {
  // извлекает параметры фильтра из route и сохраняет в store
  // вызывается при каждой перезагрузке страницы
  // search === location.search
  //
  handleRoute: (search) => {
    return (dispatch, getState) => {

      search = new URLSearchParams(search);
      const params = { ...getState().filterParams };

      Object.keys(params).forEach(key => {
        const value = search.get(key) || '';
        if (params[key] !== value) params[key] = value;
      });

      dispatch({
        type: 'filterParams/setParams',
        payload: params,
      });
    };
  },
};

export default actionsFilterParams;
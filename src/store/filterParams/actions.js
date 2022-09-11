const actionsFilterParams = {
  handleRoute: (search) => { // location.search
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
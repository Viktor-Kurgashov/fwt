const actionsFilterOptions = {
  fetchAuthors: () => {
    return async (dispatch, getState) => {

      await fetch(getState().catalog.config.APIUrl + '/authors')
        .then(res => {
          if (res.ok) return res.json();
          else throw new Error(res.status + ' ' + res.statusText);
        })
        .then(json => {
          json.map(item => {
            item.id = item.id.toString();
            item.value = item.name;
            delete item.name;
            return item;
          });
          dispatch({
            type: 'filterOptions/load-success',
            payload: {
              name: 'authors',
              items: json,
            },
          });
        })
        .catch(err => {
          dispatch({
            type: 'filterOptions/load-error',
            payload: { name: 'authors' },
          });
          console.error('store/filterOptions/actions.fetchAuthors() -', err.message);
        })
    };
  },



  fetchLocations: () => {
    return async (dispatch, getState) => {

      await fetch(getState().catalog.config.APIUrl + '/locations')
        .then(res => {
          if (res.ok) return res.json();
          else throw new Error(res.status + ' ' + res.statusText);
        })
        .then(json => {
          json.map(item => {
            item.id = item.id.toString();
            item.value = item.location;
            delete item.location;
            return item;
          });
          dispatch({
            type: 'filterOptions/load-success',
            payload: {
              name: 'locations',
              items: json,
            },
          });
        })
        .catch(err => {
          dispatch({
            type: 'filterOptions/load-error',
            payload: { name: 'locations' },
          });
          console.error('store/filterOptions/actions.fetchLocations() -', err.message);
        });
    };
  },
};

export default actionsFilterOptions;
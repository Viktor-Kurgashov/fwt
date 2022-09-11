const actionsCatalog = {
  fetchPageItems: (search) => { // location.search
    return async (dispatch, getState) => {
      dispatch({ type: 'catalog/load' });

      if (search === '') search = '?_page=1';
      let pagesNumber = 1;  
      const currentPage = /_page=/.test(search) ? +search.match(/_page=(\d+)/)[1] : 1;

      const APIUrl = getState().catalog.config.APIUrl;
      const limit = getState().catalog.config.limit;
      const APIquery = APIUrl + '/paintings' + search + '&_limit=' + limit;

      await fetch(APIquery)
        .then(res => {
          if (res.ok) {
            const Link = res.headers.get("Link");
            pagesNumber = +Link.match(/page=(\d+)[^"]+"last/)?.[1] || 1;
            return res.json();
          }
          else throw new Error(res.status + ' ' + res.statusText);
        })
        .then(json => {
          if (!json.length) {
            dispatch({ type: 'catalog/load-empty' });
            dispatch({ type: 'pagination/reset' });
          }
          else {
            const authors = getState().filterOptions.authors.items;
            const locations = getState().filterOptions.locations.items;

            json.map(item => {
              item.author = authors.find(auth => auth.id === item.authorId.toString()).value;
              delete item.authorId;
              item.location = locations.find(loc => loc.id === item.locationId.toString()).value;
              delete item.locationId;
              item.imageUrl = APIUrl + item.imageUrl;
              item.id = item.id.toString();
              return item;
            });
            dispatch({
              type: 'catalog/load-success',
              payload: json,
            });
            dispatch({
              type: 'pagination/set',
              payload: {
                search,
                currentPage,
                pagesNumber,
              },
            });
            console.log('Загружено картин:', json.length);
          }
        })
        .catch(err => {
          dispatch({ type: 'catalog/load-error' });
          dispatch({ type: 'pagination/reset' });
          console.error('store/catalog/actions.fetchPageItems() -', err.message);
        });
    };
  },
};

export default actionsCatalog;
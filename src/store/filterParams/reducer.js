const initialState = {
  q: '',
  authorId: '',
  locationId: '',
  created_gte: '',
  created_lte: '',
};

function reducer(state = initialState, action) {
  switch (action.type) {

    // вызывается из actionsFilterParams.handleRoute
    // присваивает весь объект параметров фильтра с новыми значениями
    //
    case 'filterParams/setParams':
      return action.payload;

    default:
      return state;
  }
}

export default reducer;
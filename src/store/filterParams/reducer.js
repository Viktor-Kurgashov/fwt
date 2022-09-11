const initialState = {
  q: '',
  authorId: '',
  locationId: '',
  created_gte: '',
  created_lte: '',
};

function reducer(state = initialState, action) {
  switch (action.type) {

    case 'filterParams/setParams':
      return action.payload;

    default:
      return state;
  }
}

export default reducer;
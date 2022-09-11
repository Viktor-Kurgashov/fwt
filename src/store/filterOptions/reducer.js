import { getFetchState, getDependiesLoaded } from './utils';

const initialState = {
  authors: {
    items: [],
    fetchState: getFetchState(),
  },
  locations: {
    items: [],
    fetchState: getFetchState(),
  },
  dependiesLoaded: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {

    case 'filterOptions/load-error':
      return {
        ...state,
        [action.payload.name]: {
          items: [],
          fetchState: getFetchState('error'),
        },
        dependiesLoaded: false,
      };

    case 'filterOptions/load-success':
      console.log('Загружены store.filterOptions.' + action.payload.name);
      return {
        ...state,
        [action.payload.name]: {
          items: action.payload.items,
          fetchState: getFetchState('ok'),
        },
        dependiesLoaded: getDependiesLoaded(state, action.payload.name),
      };

    default:
      return state;
  }
}

export default reducer;
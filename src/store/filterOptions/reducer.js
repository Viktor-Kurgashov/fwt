import { getFetchState, getDependiesLoaded } from './utils';

const initialState = {
  authors: {
    items: [],
    fetchState: getFetchState(), // { loading, error, ok }
  },
  locations: {
    items: [],
    fetchState: getFetchState(),
  },
  dependiesLoaded: false,
  // true если загружены authors и locations, необходимые для обработки массива картин
  // без этого загрузка картин не начнётся, проверяется через getDependiesLoaded()
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
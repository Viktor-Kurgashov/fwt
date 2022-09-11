import { getFetchState } from './utils';

const initialState = {
  pageItems: [],
  fetchState: getFetchState(),
  config: {
    APIUrl: 'https://test-front.framework.team',
    limit: 12,
  },
  themeDark: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {

    case 'catalog/load':
      return {
        ...state,
        fetchState: getFetchState(),
      };

    case 'catalog/load-error':
      return {
        ...state,
        pageItems: [],
        fetchState: getFetchState('error'),
      };

    case 'catalog/load-success':
      return {
        ...state,
        pageItems: action.payload,
        fetchState: getFetchState('ok'),
      };

    case 'catalog/load-empty':
      return {
        ...state,
        pageItems: [],
        fetchState: getFetchState('empty'),
      };

    case 'catalog/toggle-theme':
      return {
        ...state,
        themeDark: !state.themeDark,
      };

    default:
      return state;
  }
}

export default reducer;
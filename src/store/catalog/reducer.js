import { getFetchState } from './utils';

const initialState = {
  pageItems: [],
  fetchState: getFetchState(), // { loading, error, empty, ok }
  config: {
    APIUrl: 'https://test-front.framework.team',
    limit: 12,
  },
  themeDark: false, // просто не знал куда приткнуть эту переменную
};

function reducer(state = initialState, action) {
  switch (action.type) {

    // загрузка картин, накидывает blur поверх каталога
    case 'catalog/load':
      return {
        ...state,
        fetchState: getFetchState(),
      };

    // ошибка при загрузке, выводит ошибку
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

    // ошибка при загрузке, выводит ошибку
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
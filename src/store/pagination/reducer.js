import { createLinks } from './utils';

const initialState = {
  pathname: '/search?',
  search: '_page=1',
  currentPage: 1,
  pagesNumber: 1,
  links: {
    stack: [],
  },
};

function reducer(state = initialState, action) {
  switch (action.type) {

    case 'pagination/set':
      return {
        ...state,
        search: action.payload.search,
        currentPage: action.payload.currentPage,
        pagesNumber: action.payload.pagesNumber,
        links: createLinks(
          state.pathname,
          action.payload.search,
          action.payload.currentPage,
          action.payload.pagesNumber
        ),
      };

    case 'pagination/clear':
      return {
        ...state,
        search: '_page=1',
        currentPage: 1,
        pagesNumber: 1,
        links: {
          stack: [],
        },
      };

    default:
      return state;
  }
}

export default reducer;
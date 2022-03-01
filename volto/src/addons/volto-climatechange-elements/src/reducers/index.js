import { GET_ARTICLE_PUBLISHED_DATE } from '../constants/ActionTypes';

const initialState = {
  error: null,
  items: [],
  data: [],
  loaded: false,
  loading: false,
  loadedId: null,
};

export function articlePublishedDate(state = initialState, action = {}) {
  switch (action.type) {
    case `${GET_ARTICLE_PUBLISHED_DATE}_PENDING`:
      return {
        ...state,
        error: null,
        loading: true,
        loaded: false,
      };
    case `${GET_ARTICLE_PUBLISHED_DATE}_SUCCESS`:
      return {
        ...state,
        error: null,
        data: [
            ...state.data,
            {
                publishedDate: new Date(action.result.created).toLocaleDateString('en-gb', { year: 'numeric', month: 'long', day: 'numeric' }),
                '@id': action.result['@id'],
                title: action.result.title 
            }
        ],
        loaded: true,
        loading: false,
      };
    case `${GET_ARTICLE_PUBLISHED_DATE}_FAIL`:
      return {
        ...state,
        error: action.error,
        items: [],
        loading: false,
        loaded: false,
      };
    default:
      return state;
  }
}
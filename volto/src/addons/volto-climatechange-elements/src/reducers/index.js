import { uniq } from 'lodash';
import { GET_RELATED_ITEMS_DATA , GET_RAW_CONTENT } from '../constants/ActionTypes';
import { formattedDate } from '../utils';

const initialState = {
  error: null,
  items: [],
  data: [],
  loaded: false,
  loading: false,
  loadedId: null,
};

export function relatedItemsData(state = initialState, action = {}) {
  switch (action.type) {
    case `${GET_RELATED_ITEMS_DATA}_PENDING`:
      return {
        ...state,
        error: null,
        loading: true,
        loaded: false,
      };
    case `${GET_RELATED_ITEMS_DATA}_SUCCESS`:
      const uniqueRelatedItems = uniq([
        ...state.data,
        {
          publishedDate: formattedDate(action.result.created),
          '@id': action.result['@id'],
          title: action.result.title,
        },
      ]);

      return {
        ...state,
        error: null,
        data: uniqueRelatedItems,
        loaded: true,
        loading: false,
      };
    case `${GET_RELATED_ITEMS_DATA}_FAIL`:
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

export function rawdata(state = {}, action = {}) {
  let { result, url } = action;

  switch (action.type) {
    case `${GET_RAW_CONTENT}_PENDING`:
      return {
        ...state,
        [url]: {
          ...state[url],
          loading: true,
          loaded: false,
          error: undefined,
        },
      };
    case `${GET_RAW_CONTENT}_SUCCESS`:
      return {
        ...state,
        [url]: {
          ...state[url],
          loading: false,
          loaded: true,
          error: undefined,
          data: result,
        },
      };
    case `${GET_RAW_CONTENT}_FAIL`:
      return {
        ...state,
        [url]: {
          ...state[url],
          loading: false,
          loaded: false,
          error: action.error,
        },
      };
    default:
      break;
  }
  return state;
}

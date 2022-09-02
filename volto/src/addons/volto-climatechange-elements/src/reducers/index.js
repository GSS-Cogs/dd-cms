import { uniq } from 'lodash';
import {
  GET_RELATED_ITEMS_DATA,
  GET_RAW_CONTENT,
  GET_FOLDERISH_CONTENT,
  GET_SITE_TITLE,
} from '../constants/ActionTypes';
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
      const uniqueRelatedItems = uniq([...state.data, ...action.result.items]);
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

export function rawData(state = {}, action = {}) {
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

export function folderishContent(state = {}, action = {}) {
  let { result, url } = action;

  switch (action.type) {
    case `${GET_FOLDERISH_CONTENT}_PENDING`:
      return {
        ...state,
        [url]: {
          ...state[url],
          loading: true,
          loaded: false,
          error: undefined,
        },
      };
    case `${GET_FOLDERISH_CONTENT}_SUCCESS`:
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
    case `${GET_FOLDERISH_CONTENT}_FAIL`:
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

export function rawSiteTitle(state = {}, action = {}) {
  let { result, url } = action;

  switch (action.type) {
    case `${GET_SITE_TITLE}_PENDING`:
      return {
        ...state,
        siteTitle: {
          data: null,
          loading: true,
          loaded: false,
          error: undefined,
        },
      };
    case `${GET_SITE_TITLE}_SUCCESS`:
      getRawSiteTitle(result);
      return {
        ...state,
        siteTitle: {
          ...state[url],
          loading: false,
          loaded: true,
          error: undefined,
          data: result,
        },
      };
    case `${GET_SITE_TITLE}_FAIL`:
      return {
        ...state,
        siteTitle: {
          data: null,
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

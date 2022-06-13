import {
  GET_RELATED_ITEMS_DATA,
  GET_RAW_CONTENT,
} from '../constants/ActionTypes';

export function getRelatedItemsData(id) {
  return {
    type: GET_RELATED_ITEMS_DATA,
    request: {
      op: 'get',
      path: id,
    },
  };
}

export function getRawContent(url, headers = {}) {
  return {
    type: GET_RAW_CONTENT,
    request: {
      op: 'get',
      path: url,
      headers,
    },
    url,
  };
}

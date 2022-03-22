import {
  GET_CSV_DATA,
  GET_ADD_ITEM_BLOCK_DATA,
} from '../constants/ActionTypes';

export function getCsvData(contentId) {
  return {
    type: GET_CSV_DATA,
    payload: {
      contentId,
    },
    request: {
      op: 'get',
      path: contentId + '/@@download',
    },
  };
}

export function getAddItemBlockData(contentId) {
  return {
    type: GET_ADD_ITEM_BLOCK_DATA,
    payload: {
      contentId,
    },
    request: {
      op: 'get',
      path: contentId,
    },
  };
}

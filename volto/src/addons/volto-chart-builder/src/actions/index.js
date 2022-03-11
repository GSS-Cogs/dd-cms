import { GET_CSV_DATA, GET_FIGURE_BLOCK_DATA } from '../constants/ActionTypes';

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

export function getFigureBlockData(id) {
  return {
    type: GET_FIGURE_BLOCK_DATA,
    request: {
      op: 'get',
      path: id,
    },
  };
}

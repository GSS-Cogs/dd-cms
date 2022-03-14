import { GET_CSV_DATA } from '../constants/ActionTypes';

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

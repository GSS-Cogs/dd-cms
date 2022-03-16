import { GET_RELATED_ITEMS_DATA } from '../constants/ActionTypes';

export function getRelatedItemsData(id) {
  return {
    type: GET_RELATED_ITEMS_DATA,
    request: {
      op: 'get',
      path: id,
    },
  };
}

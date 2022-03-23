import {
  GET_CHART_BUILDER_DATA,
  GET_ADD_ITEM_BLOCK_DATA,
} from '../constants/ActionTypes';

export function getChartBuilderData(contentId, subRoute) {
  return {
    type: GET_CHART_BUILDER_DATA,
    payload: {
      contentId,
    },
    request: {
      op: 'get',
      path: contentId + '/' + subRoute,
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

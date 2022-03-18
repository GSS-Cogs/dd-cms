import { GET_CHART_BUILDER_DATA } from '../constants/ActionTypes';

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

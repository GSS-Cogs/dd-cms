import { GET_ARTICLE_LIST } from '../constants/ActionTypes';

export function getArticleList() {
  return {
    type: GET_ARTICLE_LIST,
    request: {
      op: 'get',
      path: '/@search',
      params: {
        portal_type: 'News Item',
        metadata_fields: ['EffectiveDate', 'getURL'],
        sort_on: 'EffectiveDate',
      },
    },
  };
}

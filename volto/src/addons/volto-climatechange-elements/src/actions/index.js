import { GET_ARTICLE_PUBLISHED_DATE } from '../constants/ActionTypes';
  
export function getArticlePublishedDate(id) {
    return {
      type: GET_ARTICLE_PUBLISHED_DATE,
      request: {
        op: 'get',
        path: id,
      },
    };
}
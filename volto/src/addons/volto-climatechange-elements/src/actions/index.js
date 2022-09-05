import {
  GET_RELATED_ITEMS_DATA,
  GET_RAW_CONTENT,
  GET_FOLDERISH_CONTENT,
  GET_PHASE_BANNER_CONTENT,
} from '../constants/ActionTypes';

export function getRelatedItemsData({
  b_size = 25, // this is batch size
  b_start = 0, // this is batch start
  sort_order = 'descending', // sort order
}) {
  return {
    type: GET_RELATED_ITEMS_DATA,
    request: {
      op: 'post',
      path: '@querystring-search',
      data: {
        metadata_fields: '_all',
        b_size,
        query: [
          {
            i: 'portal_type',
            o: 'plone.app.querystring.operation.selection.any',
            v: ['Link'],
          },
        ],
        sort_order,
        b_start,
      },
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

export function getFolderishContent(url, headers = {}) {
  return {
    type: GET_FOLDERISH_CONTENT,
    request: {
      op: 'get',
      path: url,
      headers,
    },
    url,
  };
}

export function getPhaseBannerContent() {
  return {
    type: GET_PHASE_BANNER_CONTENT,
    request: {
      op: 'get',
      path: '',
      headers: {},
    },
    url: '',
  };
}

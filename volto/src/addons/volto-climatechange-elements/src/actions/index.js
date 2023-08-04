import {
  GET_RELATED_ITEMS_DATA,
  GET_RAW_CONTENT,
  GET_FOLDERISH_CONTENT,
  GET_PHASE_BANNER_CONTENT,
  GET_SITE_TITLE,
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
      headers: { 'Content-Type': 'application/json' },
    },
    url: '',
  };
}
export function getSiteTitle() {
  return {
    type: GET_SITE_TITLE,
    request: {
      op: 'get',
      path: '@cmsconf-site_title',
      headers: { 'Content-Type': 'application/json' },
    },
    url: '',
  };
}
export function getGA_ID() {
  return {
    type: GET_GA_ID,
    request: {
      op: 'get',
      path: '@cmsconf-ga_id',
      headers: { 'Content-Type': 'application/json' },
    },
    url: '',
  };
}
export function getHotjar_ID() {
  return {
    type: GET_HOTJAR_ID,
    request: {
      op: 'get',
      path: '@cmsconf-hotjar-id',
      headers: { 'Content-Type': 'application/json' },
    },
    url: '',
  };
}

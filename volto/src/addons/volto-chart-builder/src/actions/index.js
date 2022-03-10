import {
  GET_CSV_DATA,
  GET_FIGURE_BLOCK_DATA,
  CSV_DATA_SET_LOADED_FILE_ID,
} from '../constants/ActionTypes';

export function getCsvData(contentId) {
  return {
    type: GET_CSV_DATA,
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

export function setLoadedFileId(contentId) {
  return {
    type: CSV_DATA_SET_LOADED_FILE_ID,
    payload: {
      contentId,
    },
  };
}

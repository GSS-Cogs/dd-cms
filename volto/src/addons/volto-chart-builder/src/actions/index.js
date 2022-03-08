import {
  GET_CSV_DATA,
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

export function setLoadedFileId(contentId) {
  return {
    type: CSV_DATA_SET_LOADED_FILE_ID,
    payload: {
      contentId,
    },
  };
}

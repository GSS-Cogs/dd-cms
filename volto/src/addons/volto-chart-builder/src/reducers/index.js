/**
 * news items reducer.
 */

import { GET_CSV_DATA, CSV_DATA_SET_LOADED_FILE_ID } from '../constants/ActionTypes';

const initialState = {
  error: null,
  items: [],
  loaded: false,
  loading: false,
  loadedId: null,
};

/**
 * Faq reducer.
 * @function faq
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export function chartBuilderRawData(state = initialState, action = {}) {
  switch (action.type) {
    case CSV_DATA_SET_LOADED_FILE_ID:
      return {
        ...state,
        loaded: false,
        loading: false,
        items: null,
        loadedId: action.payload.contentId,
      };
    case `${GET_CSV_DATA}_PENDING`:
      return {
        ...state,
        error: null,
        loading: true,
        loaded: false,
      };
    case `${GET_CSV_DATA}_SUCCESS`:
      return {
        ...state,
        error: null,
        content: action.result,
        loaded: true,
        loading: false,
      };
    case `${GET_CSV_DATA}_FAIL`:
      return {
        ...state,
        error: action.error,
        items: [],
        loading: false,
        loaded: false,
      };
    default:
      return state;
  }
}

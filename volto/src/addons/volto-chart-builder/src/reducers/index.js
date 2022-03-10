/**
 * news items reducer.
 */

import { uniq } from 'lodash';

import {
  GET_CSV_DATA,
  GET_FIGURE_BLOCK_DATA,
  CSV_DATA_SET_LOADED_FILE_ID,
} from '../constants/ActionTypes';

const initialState = {
  error: null,
  items: [],
  data: [],
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

export function figureBlockData(state = initialState, action = {}) {
  switch (action.type) {
    case `${GET_FIGURE_BLOCK_DATA}_PENDING`:
      return {
        ...state,
        error: null,
        loading: true,
        loaded: false,
      };
    case `${GET_FIGURE_BLOCK_DATA}_SUCCESS`:
      return {
        ...state,
        error: null,
        data: uniq([
          ...state.data,
          {
            id: action.result['@id'],
            blocks: action.result.blocks,
            blocks_layout: action.result.blocks_layout,
            Background: action.result.Background,
          },
        ]),
        loaded: true,
        loading: false,
      };
    case `${GET_FIGURE_BLOCK_DATA}_FAIL`:
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

/**
 * news items reducer.
 */

import { GET_CHART_BUILDER_DATA } from '../constants/ActionTypes';

const initialState = new Map();

const initialEntry = Object.freeze({
  error: null,
  content: [],
  loaded: false,
  loading: false,
});

/**
 * Faq reducer.
 * @function faq
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export function chartBuilderRawData(state = initialState, action = {}) {
  switch (action.type) {
    case `${GET_CHART_BUILDER_DATA}_PENDING`:
      return new Map([
        ...state,
        [
          action.payload.contentId,
          {
            ...initialEntry,
            loading: true,
          },
        ],
      ]);
    case `${GET_CHART_BUILDER_DATA}_SUCCESS`:
      return new Map([
        ...state,
        [
          action.payload.contentId,
          {
            ...initialEntry,
            error: null,
            content: action.result,
            loaded: true,
            loading: false,
          },
        ],
      ]);
    case `${GET_CHART_BUILDER_DATA}_FAIL`:
      return new Map([
        ...state,
        [
          action.payload.contentId,
          {
            ...initialEntry,
            error: action.error,
            content: [],
            loading: false,
            loaded: false,
          },
        ],
      ]);
    default:
      return state;
  }
}

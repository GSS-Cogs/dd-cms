/**
 * news items reducer.
 */

import { GET_ARTICLE_LIST } from '../constants/ActionTypes';

const initialState = {
  error: null,
  items: [],
  loaded: false,
  loading: false,
};

/**
 * Faq reducer.
 * @function faq
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function articlesList(state = initialState, action = {}) {
  switch (action.type) {
    case `${GET_ARTICLE_LIST}_PENDING`:
      return {
        ...state,
        error: null,
        loading: true,
        loaded: false,
      };
    case `${GET_ARTICLE_LIST}_SUCCESS`:
      return {
        ...state,
        error: null,
        items: action.result.items,
        loaded: true,
        loading: false,
      };
    case `${GET_ARTICLE_LIST}_FAIL`:
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

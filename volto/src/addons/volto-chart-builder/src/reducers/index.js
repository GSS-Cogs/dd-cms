/**
 * news items reducer.
 */

import {
  GET_CHART_BUILDER_DATA,
  GET_ADD_ITEM_BLOCK_DATA,
} from '../constants/ActionTypes';

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

const initialAddItemBlockDataState = new Map();

const initialAddItemBlockDataEntry = Object.freeze({
  error: null,
  items: [],
  data: [],
  loaded: false,
  loading: false,
  loadedId: null,
});

const mapData = (state, newEntry) => {
  if (state[Symbol.iterator]) {
    return [...state[Symbol.iterator](), newEntry];
  }

  return [newEntry];
};

export function addItemBlockData(
  state = initialAddItemBlockDataState,
  action = {},
) {
  switch (action.type) {
    case `${GET_ADD_ITEM_BLOCK_DATA}_PENDING`:
      return new Map(
        mapData(state, [
          action.payload.contentId,
          {
            ...initialAddItemBlockDataEntry,
            loading: true,
          },
        ]),
      );
    case `${GET_ADD_ITEM_BLOCK_DATA}_SUCCESS`:
      return new Map(
        mapData(state, [
          action.payload.contentId,
          {
            ...initialAddItemBlockDataEntry,
            error: null,
            data: {
              id: action.result['@id'],
              title: action.result['title'],
              type: action.result['@type'],
              blocks: action.result.blocks,
              blocks_layout: action.result.blocks_layout,
              Background: action.result.Background,
            },
            loaded: true,
            loading: false,
          },
        ]),
      );

    case `${GET_ADD_ITEM_BLOCK_DATA}_FAIL`:
      return new Map(
        mapData(state, [
          action.payload.contentId,
          {
            ...initialAddItemBlockDataEntry,
            error: action.error,
            content: [],
            loading: false,
            loaded: false,
          },
        ]),
      );
    default:
      return state;
  }
}

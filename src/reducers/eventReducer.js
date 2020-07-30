import {
  SET_ALL_EVENTS,
  SET_CURRENT_EVENT,
  SET_CURRENT_STATES,
  SET_CURRENT_CONTRACTS,
  SET_CURRENT_MARKETS,
  SET_LOADING
} from '../actionTypes';

const initialState = {
  loading: false,
  events: [],
  currentEvent: {},
  currentState: {},
  currentMarkets: [],
  currentContracts: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case SET_ALL_EVENTS:
      return { ...state, events: action.payload };
    case SET_CURRENT_EVENT:
      return {
        ...state,
        currentEvent: action.payload
      };
    case SET_CURRENT_STATES:
      return {
        ...state,
        currentState: action.payload
      };
    case SET_CURRENT_MARKETS:
      return {
        ...state,
        currentMarkets: action.payload
      };
    case SET_CURRENT_CONTRACTS:
      return {
        ...state,
        currentContracts: action.payload
      };
    default:
      return state;
  }
};

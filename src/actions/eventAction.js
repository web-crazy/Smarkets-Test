import axios from 'axios';
import {
  SET_ALL_EVENTS,
  SET_CURRENT_EVENT,
  SET_CURRENT_STATES,
  SET_CURRENT_MARKETS,
  SET_CURRENT_CONTRACTS,
  SET_LOADING
} from '../actionTypes';

const API = axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/https://api.smarkets.com/v3',
  responseType: 'json'
});

export const setLoading = status => dispatch => {
  dispatch({
    type: SET_LOADING,
    payload: status
  });
};

export const getPopularEvents = sportName => async dispatch => {
  dispatch(setLoading(true));

  try {
    const popularEvents = (await API.get(
      `/popular/event_ids/sport/${sportName}`
    )).data;
    const eventIds = popularEvents.popular_event_ids;
    const events = (await API.get(`/events/${eventIds.join(',')}/`)).data;

    dispatch({
      type: SET_ALL_EVENTS,
      payload: events.events
    });

    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    console.log(error);
  }
};

export const getEventDetails = eventId => async dispatch => {
  dispatch(setLoading(true));

  try {
    const event = (await API.get(`/events/${eventId}`)).data['events'][0];
    dispatch({
      type: SET_CURRENT_EVENT,
      payload: event
    });

    const statesResponse = await API.get(`/events/${eventId}/states`);
    const states = statesResponse.data['event_states'];
    dispatch({
      type: SET_CURRENT_STATES,
      payload: states[0]
    });

    const marketsResponse = await API.get(`/events/${eventId}/markets`);
    const markets = marketsResponse.data['markets'];
    dispatch({
      type: SET_CURRENT_MARKETS,
      payload: markets
    });

    const marketIds = markets.map(market => market.id);
    const contractsResponse = await API.get(
      `/markets/${marketIds.join(',')}/contracts`
    );
    const contracts = contractsResponse.data['contracts'].slice(20);
    dispatch({
      type: SET_CURRENT_CONTRACTS,
      payload: contracts
    });

    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    console.log(error);
  }
};

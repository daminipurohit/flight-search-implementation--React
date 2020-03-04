/* eslint-disable arrow-body-style */
import { GET_ONE_WAY_FLIGHTS_RESULTS, GET_ALL_FLIGHTS_RESULTS } from './types';
import { getOneWayFlights } from '../utils/flights';
// NOTE: action creator function that calls/dispatches actions
import API from '../utils/api';

const getAllFlightsUrl = 'advFlightSearch.json';

export const fetchAllFlightsData = () => dispatch => {
    return new Promise((resolve, reject) => {
        API.get(getAllFlightsUrl).then(({ data }) => {
            dispatch({
                type: GET_ALL_FLIGHTS_RESULTS,
                payload: data
            });
            return resolve({ success: true });
        }).catch(err => {
            return reject(err);
        });
    });
};

export const fetchOneWayFlightResults = data => dispatch => {
    return new Promise((resolve, reject) => {
        const { selectedOrigin: from, selectedDestination: to } = data;
        return getOneWayFlights(data).then(res => {
            const payload = {
                res,
                query: `${from}-${to}`
            };
            dispatch({
                type: GET_ONE_WAY_FLIGHTS_RESULTS,
                payload
            });
            return resolve({ success: true });
        }).catch(err => {
            return reject(err);
        });
    });
};

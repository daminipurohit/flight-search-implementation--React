/* eslint-disable no-case-declarations */
import { cloneDeep } from 'lodash';
import {
    GET_ALL_FLIGHTS_RESULTS, GET_ONE_WAY_FLIGHTS_RESULTS
} from '../actions/types';

// eg: {oneWay: { Mumbai (BOM)-Pune (PNQ): {direct: [], multiFlights: []}}}
const initialState = {
    oneWay: {},
    allFlights: []
};

const getUpdatedState = ({ state, action, stateKey }) => {
    const updatedData = cloneDeep(state[stateKey]);
    const { payload: { query, res: { direct, multiFlights } } } = action;
    if (!updatedData[query]) {
        updatedData[query] = {};
    }
    const updatedQueryState = cloneDeep(updatedData[query]);
    updatedQueryState.direct = direct;
    updatedQueryState.multiFlights = multiFlights;
    updatedData[query] = updatedQueryState;

    const updatedState = cloneDeep(state);
    updatedState[stateKey] = updatedData;

    return updatedState;
};

const updateAllFlightsInState = (state, action) => {
    const updatedState = cloneDeep(state);
    updatedState.allFlights = action.payload;
    return updatedState;
};

const flightsReducer = (state = initialState, action) => {
    switch (action.type) {
    case GET_ALL_FLIGHTS_RESULTS:
        return updateAllFlightsInState(state, action);
    case GET_ONE_WAY_FLIGHTS_RESULTS:
        const oneWayData = { state, action, stateKey: 'oneWay' };
        const updatedState = getUpdatedState(oneWayData);
        return updatedState;

    default:
        return state;
    }
};

export default flightsReducer;

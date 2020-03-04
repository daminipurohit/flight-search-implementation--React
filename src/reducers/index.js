import { combineReducers } from 'redux';
import flightsReducer from './flightsReducer';

export default combineReducers({
    flights: flightsReducer
});

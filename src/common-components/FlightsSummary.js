import React from 'react';
import PropTypes from 'prop-types';
import { getReadableFullDate } from '../utils/flights';
import '../styles/flightSummary.scss';

const FlightsSummary = ({ flightsData: { from, to, date }, count, planeIcon }) => {
    const dateString = getReadableFullDate(date);
    return (
        <div className="flight-header-container">
            <div className="flight-header">
                {planeIcon}
                <span className="header-label">{from} to {to}</span>
            </div>
            <div className="sub-header">
                <span>{count} flight(s) found,</span>
                <span>{dateString}</span>
            </div>
        </div>
    );
};

FlightsSummary.propTypes = {
    flightsData: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired,
    planeIcon: PropTypes.node.isRequired
};

export default FlightsSummary;

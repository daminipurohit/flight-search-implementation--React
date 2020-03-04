import React from 'react';
import PropTypes from 'prop-types';
import FlightSearchOneWay from './FlightSearchOneWay';
import '../styles/flightSearchTwoWay.scss';

const FlightSearchTwoWay = ({ twoWaySearchParams }) => {
    const { selectedOrigin, selectedDestination, startDate, returnDate, passengers, priceRange } = twoWaySearchParams;
    const startParams = { selectedOrigin, selectedDestination, startDate, passengers, priceRange };
    const returnParams = { selectedOrigin: selectedDestination,
        selectedDestination: selectedOrigin, startDate: returnDate, passengers, priceRange };
    return (
        <div className="flight-search-two-way-container">
            <FlightSearchOneWay oneWaySearchParams={startParams} isDeparture />
            <FlightSearchOneWay oneWaySearchParams={returnParams} />
        </div>
    );
};

FlightSearchTwoWay.propTypes = {
    twoWaySearchParams: PropTypes.object.isRequired
};

export default FlightSearchTwoWay;

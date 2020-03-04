import React from 'react';
import PropTypes from 'prop-types';
import { cloneDeep } from 'lodash';
import FlightRow from './FlightRow';
import LayoverRow from './LayoverRow';
import Button from './Button';
import MultiFlightIcon from '../icons/multiFlight.svg';
import { getTimeDifferenceInHrMns } from '../utils/flights';

import '../styles/multipleFlightRow.scss';

class MultipleFlightRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDetails: false
        };
    }

    getTotalFlightPrice = ({ flight, passengers }) => {
        const sum = flight.reduce((acc, e) => acc + e.price, 0);
        return sum * passengers;
    }

    getFlightRow = ({ flight, passengers }) => {
        let arrDateTime = null;
        let depDateTime = null;
        const flightData = flight.map((each, index) => {
            const depTime = flight[1].departureTime;
            const arrTime = flight[0].arrivalTime;
            depDateTime = `${flight[1].date} ${depTime}`;
            arrDateTime = `${flight[0].date} ${arrTime}`;

            return (
                <FlightRow
                    flight={each} key={index} passengers={passengers}
                    hidePrice hideBooking />
            );
        });

        const flightWithLayover = cloneDeep(flightData);
        const layoverTime = getTimeDifferenceInHrMns(depDateTime, arrDateTime);
        flightWithLayover.splice(1, 0,
            <div key="lay" className="layover-section">
                <LayoverRow layoverTime={`Layover time ${layoverTime}`} />
            </div>);
        return (
            <div className="multi-sub-flight-wrapper">
                {flightWithLayover}
            </div>
        );
    }

    onShowDetails = () => {
        this.setState(({ showDetails }) => ({ showDetails: !showDetails }));
    }

    onClickBook = () => (null);

    render() {
        const { props: { flight, passengers }, state: { showDetails } } = this;
        const depTime = flight[0].departureTime;
        const arrTime = flight[1].arrivalTime;
        const depDateTime = `${flight[0].date} ${depTime}`;
        const arrDateTime = `${flight[1].date} ${arrTime}`;
        return (
            <div className="multi-flight-wrapper">
                <div className="multi-flight-row">
                    <img src={MultiFlightIcon} className="multi-flight-icon"
                        alt="multi-flight-icon" />
                    <div className="flight-name">
                        <div className="flight-detail">Multiple</div>
                        <div className="flight-sub-detail multiple-link">
                            <a href="#" onClick={this.onShowDetails}>
                                {showDetails ? 'Hide ' : 'Show '}details
                            </a>
                        </div>
                    </div>
                    <div className="flight-from">
                        <div className="flight-detail">{depTime}</div>
                        <div className="flight-sub-detail">{flight[0].origin}</div>
                    </div>
                    <div className="flight-to">
                        <div className="flight-detail">{arrTime}</div>
                        <div className="flight-sub-detail">{flight[1].destination}</div>
                    </div>
                    <div className="flight-hours">
                        <div className="flight-detail">
                            {getTimeDifferenceInHrMns(arrDateTime, depDateTime)}
                        </div>
                        <div className="flight-sub-detail">Total Duration</div>
                    </div>
                    <div className="flight-price">
                        <span className="logo-inr" aria-hidden="true">
                &#8377;
                        </span>
                        <span className="flight-price">
                            {this.getTotalFlightPrice({ flight, passengers })}
                        </span>
                    </div>
                    <Button className="flight-book-button" label="Book" danger onClick={this.onClickBook} />
                </div>
                {showDetails && this.getFlightRow({ flight, passengers })}
            </div>
        );
    }
}

MultipleFlightRow.propTypes = {
    flight: PropTypes.array.isRequired,
    passengers: PropTypes.number.isRequired
};

export default MultipleFlightRow;

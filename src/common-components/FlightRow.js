import React from 'react';
import PropTypes from 'prop-types';
import FlightIcon from '../icons/departFlight-dark.svg';
import Button from './Button';
import '../styles/flightRow.scss';
import { getTimeDifferenceInHrMns } from '../utils/flights';

class FlightRow extends React.Component {
    getFlightPrice = () => {
        const { flight, passengers } = this.props;
        return flight.price * passengers;
    }

    onClickBook = () => null

    render() {
        const { flight, hidePrice = false, hideBooking = false } = this.props;
        const aT = flight.arrivalTime;
        const dT = flight.departureTime;
        const arrivalTime = `${flight.date} ${aT}`;
        const depTime = `${flight.date} ${dT}`;
        return (
            <div className="flight-row">
                <img src={FlightIcon} className="direct-flight-icon"
                    alt="direct-flight-icon" />
                <div className="flight-name">
                    <div className="flight-detail">{flight.name}</div>
                    <div className="flight-sub-detail">{flight.flightNo}</div>
                </div>
                <div className="flight-from">
                    <div className="flight-detail">{flight.departureTime}</div>
                    <div className="flight-sub-detail">{flight.origin}</div>
                </div>
                <div className="flight-to">
                    <div className="flight-detail">{flight.arrivalTime}</div>
                    <div className="flight-sub-detail">{flight.destination}</div>
                </div>
                <div className="flight-hours">
                    <div className="flight-detail">
                        {getTimeDifferenceInHrMns(arrivalTime, depTime)}
                    </div>
                    <div className="flight-sub-detail">Non stop</div>
                </div>
                {!hidePrice
                && (
                    <div className="flight-price">
                        <span className="logo-inr" aria-hidden="true">
                &#8377;
                        </span>
                        <span className="flight-price">
                            {this.getFlightPrice()}
                        </span>
                    </div>
                )}
                {!hideBooking
                && <Button className="flight-book-button" label="Book" danger onClick={this.onClickBook} />}
            </div>
        );
    }
}

FlightRow.propTypes = {
    flight: PropTypes.object.isRequired,
    passengers: PropTypes.number.isRequired,
    hideBooking: PropTypes.bool,
    hidePrice: PropTypes.bool
};

export default FlightRow;

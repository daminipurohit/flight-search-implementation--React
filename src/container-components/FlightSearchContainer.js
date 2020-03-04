import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import FlightSearchOneWay from './FlightSearchOneWay';
import FlightSearchTwoWay from './FlightSearchTwoWay';
import FlightSearchForm from './FlightSearchForm';
import Tabs from '../common-components/Tabs';
import InfoComponent from '../common-components/InfoComponent';
import FlightIcon from '../icons/flight.svg';
import Loader from '../common-components/Loader';
import ErrorComponent from '../common-components/ErrorComponent';
import { fetchAllFlightsData } from '../actions/flightResultActions';
import '../styles/flightSearchContainer.scss';

export class FlightSearchContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isReturnTrip: false,
            displayOneWayResults: false,
            displayTwoWayResults: false,
            oneWaySearchParams: {},
            twoWaySearchParams: {},
            isErrored: false,
            isLoading: false
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true }, () => {
            this.props.fetchAllFlightsData()
                .then(() => {
                    this.setState({ isErrored: false, isLoading: false });
                })
                .catch(() => {
                    this.setState({ isErrored: true, isLoading: false });
                });
        });
    }

    get getResults () {
        const { state: { isLoading, isErrored, oneWaySearchParams,
            twoWaySearchParams, isReturnTrip, displayOneWayResults, displayTwoWayResults } } = this;
        if (isLoading) {
            return <Loader loaderMsg="loading flight data" />;
        }
        if (isErrored) {
            return <ErrorComponent />;
        }
        if ((!displayOneWayResults && !displayTwoWayResults)
         || (isEmpty(oneWaySearchParams) && isEmpty(twoWaySearchParams))
         || (isReturnTrip && isEmpty(twoWaySearchParams))) {
            return (
                <InfoComponent>
                    <div className="search-results-default">
                        <img src={FlightIcon} className="img-icon" alt="flight-icon" />
                        <div className="default-search-content">
                        Search for flights, Happy flying.
                        </div>
                    </div>
                </InfoComponent>
            );
        }
        if (!isReturnTrip && !isEmpty(oneWaySearchParams)) {
            return <FlightSearchOneWay oneWaySearchParams={oneWaySearchParams} isDeparture />;
        }
        if (isReturnTrip && !isEmpty(twoWaySearchParams)) {
            return <FlightSearchTwoWay twoWaySearchParams={twoWaySearchParams} />;
        }
        return null;
    }

    onTabClick = tab => {
        if (tab === 'Return') {
            return this.setState({ isReturnTrip: true });
        }
        return this.setState({ isReturnTrip: false });
    }

    resetSearchResults = () => {
        this.setState({ displayOneWayResults: false, displayTwoWayResults: false });
    }

    searchFlights = params => {
        const { state: { isReturnTrip } } = this;
        params.selectedOrigin = params.selectedOrigin.label;
        params.selectedDestination = params.selectedDestination.label;
        if (!isReturnTrip) {
            return this.setState({ displayOneWayResults: true, oneWaySearchParams: params });
        }
        return this.setState({ displayTwoWayResults: true, twoWaySearchParams: params });
    }

    render () {
        const { state: { isReturnTrip }, searchFlights } = this;
        const tabData = [{ label: 'One Way' }, { label: 'Return' }];
        return (
            <div className="flight-search-container">
                <div className="flight-search-form-container">
                    <Tabs tabData={tabData} onClick={this.onTabClick} />
                    <FlightSearchForm isReturnTrip={isReturnTrip}
                        searchFlights={searchFlights} resetSearchResults={this.resetSearchResults} />
                </div>
                {this.getResults}
            </div>
        );
    }
}

FlightSearchContainer.propTypes = {
    fetchAllFlightsData: PropTypes.func.isRequired
};

export default connect(null,
    { fetchAllFlightsData })(FlightSearchContainer);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get, isEmpty } from 'lodash';
import { fetchOneWayFlightResults } from '../actions/flightResultActions';
import FlightsSummary from '../common-components/FlightsSummary';
import MultipleFlightRow from '../common-components/MultipleFlightRow';
import FlightRow from '../common-components/FlightRow';
import Loader from '../common-components/Loader';
import ErrorComponent from '../common-components/ErrorComponent';
import FlightIcon from '../icons/departFlight.svg';
import '../styles/flightSearchOneWay.scss';

const mapStateToProps = (state, ownProps) => {
    const { oneWaySearchParams: { selectedOrigin: from, selectedDestination: to } } = ownProps;
    return {
        allFlights: get(state, ['flights', 'allFlights']),
        oneWayResults: get(state, ['flights', 'oneWay', `${from}-${to}`]) || null
    };
};

class FlightSearchOneWay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isErrored: false,
            oneWayResults: props.oneWayResults,
            allFlights: props.allFlights
        };
    }

    static getDerivedStateFromProps (nextProps, prevState) {
        let oneWayResults = null;
        let allFlights = null;

        if (nextProps.oneWayResults !== undefined && nextProps.oneWayResults !== null
             && nextProps.oneWayResults !== prevState.oneWayResults) {
            oneWayResults = nextProps.oneWayResults;
        }

        if (nextProps.allFlights !== undefined && nextProps.allFlights !== null
            && nextProps.allFlights !== prevState.allFlights) {
            allFlights = nextProps.allFlights;
        }

        if (oneWayResults) {
            return {
                oneWayResults,
                allFlights
            };
        }

        return null;
    }

    componentDidMount() {
        const { props: { oneWaySearchParams }, state: { allFlights } } = this;
        this.setState({ isLoading: true },
            () => this.props.fetchOneWayFlightResults({ allFlights, ...oneWaySearchParams })
                .then(() => this.setState({ isLoading: false, isErrored: false }))
                .catch(() => {
                    this.setState({ isLoading: false, isErrored: true });
                }));
    }

    getDirectFlights = () => {
        const { state: { oneWayResults: { direct } }, props: { oneWaySearchParams: { passengers } } } = this;

        const data = direct.map((flight, index) => <FlightRow flight={flight} key={index} passengers={passengers} />);
        return data;
    }

    getMultipleFlights = () => {
        const { state: { oneWayResults: { multiFlights } }, props: { oneWaySearchParams: { passengers } } } = this;
        const data = multiFlights.map((flight, index) => (
            <MultipleFlightRow
                flight={flight} key={index} passengers={passengers} />
        ));
        return data;
    }

    getPlaneIcon = isDeparture => {
        if (isDeparture) {
            return (
                <img src={FlightIcon} className="direct-departure-flight-icon"
                    alt="direct-departure-flight-icon" />
            );
        }
        return (
            <img src={FlightIcon} className="direct-arrival-flight-icon"
                alt="direct-arrival-flight-icon" />
        );
    }

    get getResults () {
        const { props: { oneWaySearchParams: { selectedOrigin: from,
            selectedDestination: to, startDate: date }, isDeparture = false }, state: { oneWayResults } } = this;
        const flightsData = { from, to, date };
        const count = oneWayResults.direct.length + oneWayResults.multiFlights.length;
        const planeIcon = this.getPlaneIcon(isDeparture);
        return (
            <div className="flight-results">
                <FlightsSummary flightsData={flightsData} count={count} planeIcon={planeIcon} />
                {!count && <ErrorComponent errorMsg="Sorry, no data found" />}
                {
                    this.getDirectFlights()
                }
                {
                    this.getMultipleFlights()
                }
            </div>
        );
    }

    render () {
        const { state: { isLoading, isErrored, oneWayResults } } = this;
        const displayResults = !isLoading && !isErrored && oneWayResults && !isEmpty(oneWayResults);
        return (
            <div className="flight-search-one-way-container">
                {
                    isLoading && <Loader loaderMsg="loading flight data" />
                }
                {
                    isErrored && <ErrorComponent />
                }
                {
                    displayResults && this.getResults
                }
            </div>
        );
    }
}

FlightSearchOneWay.propTypes = {
    oneWayResults: PropTypes.object,
    fetchOneWayFlightResults: PropTypes.func.isRequired,
    oneWaySearchParams: PropTypes.object.isRequired,
    allFlights: PropTypes.array.isRequired,
    isDeparture: PropTypes.bool
};

export default connect(mapStateToProps,
    { fetchOneWayFlightResults })(FlightSearchOneWay);

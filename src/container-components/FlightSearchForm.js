import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, cloneDeep } from 'lodash';
import '../styles/flightSearchForm.scss';
import { cities } from '../utils/cities';
import Dropdown from '../common-components/Dropdown';
import DatePicker from '../common-components/DatePicker';
import Button from '../common-components/Button';
import { validateSearchForm } from '../utils/searchFormValidation';
import RangeSlider from '../common-components/RangeSlider';

class FlightSearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOrigin: null,
            selectedDestination: null,
            citiesData: cities.map(city => ({ label: city, value: city })),
            startDate: null,
            returnDate: null,
            passengers: 1,
            priceRange: { min: 0, max: 10000 },
            errors: {}
        };
    }

    isDuplicateCity = (cityKey, data) => {
        const { state: { selectedOrigin, selectedDestination } } = this;
        if (cityKey === 'selectedOrigin' && selectedDestination && data.value === selectedDestination.value) {
            return true;
        }
        if (cityKey === 'selectedDestination' && selectedOrigin && data.value === selectedOrigin.value) {
            return true;
        }
        return false;
    }

    onCityChange = (data, cityKey) => {
        // test no same city selected
        const isDuplicateCity = this.isDuplicateCity(cityKey, data);
        this.setState(prevState => {
            const errors = cloneDeep(prevState.errors);
            if (isDuplicateCity) {
                errors.isDuplicateCity = 'Cannot select same city!';
                errors.selectedOrigin = 'form-error';
                errors.selectedDestination = 'form-error';
            }
            delete errors[cityKey];
            delete errors.isDuplicateCity;
            delete errors.selectedOrigin;
            delete errors.selectedDestination;
            return {
                [cityKey]: data,
                errors
            };
        });
        this.props.resetSearchResults();
    }

    onDateChange = (date, key) => {
        this.setState(prevState => {
            const errors = cloneDeep(prevState.errors);
            delete errors[key];
            return {
                [key]: date,
                errors
            };
        });
        this.props.resetSearchResults();
    }

    onClickSearch = () => {
        const { state: { citiesData, errors: stateErrors, ...searchParams },
            props: { isReturnTrip, resetSearchResults } } = this;
        resetSearchResults();
        // run validation

        const errors = validateSearchForm({ searchParams, isReturnTrip });
        if (isEmpty(errors)) {
            // seacrh results
            return this.props.searchFlights(searchParams);
        }
        // show errors
        return this.setState({ errors });
    }

    onChangePassenger = event => {
        event.persist();
        this.setState(prevState => {
            const errors = cloneDeep(prevState.errors);
            delete errors.passengers;
            return {
                passengers: Number(event.target.value),
                errors
            };
        });
        this.props.resetSearchResults();
    }

    onChangePriceRange = ({ min, max }) => {
        const priceRange = { min, max };
        if (min < 0) {
            priceRange.min = 0;
        }

        if (max > 10000) {
            priceRange.max = 10000;
        }

        this.setState(prevState => {
            const errors = cloneDeep(prevState.errors);
            delete errors.priceRange;
            return {
                priceRange,
                errors
            };
        });
        this.props.resetSearchResults();
    }

    render () {
        const { state: { citiesData, selectedOrigin, selectedDestination, startDate,
            returnDate, passengers, errors, priceRange },
        props: { isReturnTrip } } = this;

        return (
            <div className="flight-search-form">
                <Dropdown options={citiesData} className={`form-element ${errors.selectedOrigin}`}
                    value={selectedOrigin} placeholder="Enter Origin City"
                    onChange={city => this.onCityChange(city, 'selectedOrigin')} />
                <Dropdown options={citiesData} className={`form-element ${errors.selectedDestination}`}
                    value={selectedDestination} placeholder="Enter Destination City"
                    onChange={city => this.onCityChange(city, 'selectedDestination')} />
                {errors && errors.isDuplicateCity
                 && <div className="form-duplicate-city-error">{errors.isDuplicateCity} </div>}
                <DatePicker placeholderText="Departure Date" className={`form-element form-date ${errors.startDate}`}
                    onChange={date => this.onDateChange(date, 'startDate')} selected={startDate} />
                {
                    isReturnTrip && (
                        <DatePicker placeholderText="Return Date" className={`form-element form-date ${errors.returnDate}`}
                            onChange={date => this.onDateChange(date, 'returnDate')} selected={returnDate} />
                    )
                }
                <input className={`form-element form-number ${errors.passengers}`} onChange={this.onChangePassenger}
                    type="number" placeholder="passengers" min="1" value={passengers} />
                <div className="price-range form-element">
                    <div className="price-range-text">Price range per flight:</div>
                    <RangeSlider range={priceRange} maxRange={10000} minRange={0}
                        onChangeRange={this.onChangePriceRange} />
                </div>
                <Button label="Search" onClick={this.onClickSearch}
                    primary className="form-submit" disabled={!isEmpty(errors)} />
            </div>
        );
    }
}

FlightSearchForm.propTypes = {
    isReturnTrip: PropTypes.bool.isRequired,
    searchFlights: PropTypes.func.isRequired,
    resetSearchResults: PropTypes.func.isRequired
};

export default FlightSearchForm;

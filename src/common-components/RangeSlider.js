import React from 'react';
import PropTypes from 'prop-types';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

const RangeSlider = ({ maxRange, minRange, range, onChangeRange }) => (
    <InputRange
        maxValue={maxRange}
        minValue={minRange}
        value={range}
        onChange={rangeValue => onChangeRange(rangeValue)} />
);

RangeSlider.propTypes = {
    maxRange: PropTypes.number.isRequired,
    minRange: PropTypes.number.isRequired,
    range: PropTypes.object.isRequired,
    onChangeRange: PropTypes.func.isRequired
};

export default RangeSlider;

import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DatePickerWrapper = ({ onChange, selected, placeholderText = 'Date', className }) => (
    <DatePicker placeholderText={placeholderText}
        className={className}
        onChange={onChange} selected={selected} />
);

DatePickerWrapper.propTypes = {
    onChange: PropTypes.func.isRequired,
    placeholderText: PropTypes.string,
    selected: PropTypes.object,
    className: PropTypes.string
};

export default DatePickerWrapper;

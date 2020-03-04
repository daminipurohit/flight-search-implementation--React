import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const Dropdown = ({ options, onChange, placeholder, className, value }) => (
    <Select options={options} onChange={onChange} className={className}
        placeholder={placeholder} value={value} />
);

Dropdown.propTypes = {
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    value: PropTypes.string
};

export default Dropdown;

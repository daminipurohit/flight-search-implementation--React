import React from 'react';
import PropTypes from 'prop-types';
import '../styles/layoverRow.scss';

const LayoverRow = ({ layoverTime }) => (
    <div className="layover-wrapper">
        <span className="layover-text">{layoverTime}</span>
        <div className="horizontal-dash" />
    </div>
);

LayoverRow.propTypes = {
    layoverTime: PropTypes.string.isRequired
};

export default LayoverRow;

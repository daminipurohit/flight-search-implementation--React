import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Loader.scss';

const Loader = ({ loaderMsg = 'Loading data...' }) => (
    <div className="loader-container">
        <div className="loader-icon" />
        <div className="loader-message">{loaderMsg}</div>
    </div>
);

Loader.propTypes = {
    loaderMsg: PropTypes.string
};
export default Loader;

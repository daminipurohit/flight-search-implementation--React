import React from 'react';
import PropTypes from 'prop-types';
import '../styles/ErrorComponent.scss';

const ErrorComponent = ({ errorMsg = 'Something went wrong. Please try again in sometime.' }) => (
    <div className="error-container">
        <div className="error-message">{errorMsg}</div>
    </div>
);

ErrorComponent.propTypes = {
    errorMsg: PropTypes.string
};
export default ErrorComponent;

import React from 'react';
import PropTypes from 'prop-types';

const InfoComponent = ({ children }) => (
    <div className="info-container">
        <div className="info-content">{children}</div>
    </div>
);

InfoComponent.propTypes = {
    children: PropTypes.node.isRequired
};
export default InfoComponent;

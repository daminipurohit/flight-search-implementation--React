import React from 'react';
import PropTypes from 'prop-types';
import '../styles/button.scss';

const getClassName = ({ className, primary, danger, disabled }) => {
    let btnClass = `button-default ${className}`;
    if (primary) {
        btnClass += ' button-primary';
    }
    if (danger) {
        btnClass += ' button-danger';
    }
    if (disabled) {
        btnClass += ' button-disabled';
    }
    return btnClass;
};

const Button = ({ className = '', label, onClick, primary, danger, disabled = false }) => {
    const buttonClass = getClassName({ className, primary, danger, disabled });
    return (
        <button className={buttonClass} onClick={onClick} disabled={disabled}>{label}</button>
    );
};

Button.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    primary: PropTypes.bool,
    danger: PropTypes.bool,
    className: PropTypes.string,
    disabled: PropTypes.bool
};

export default Button;

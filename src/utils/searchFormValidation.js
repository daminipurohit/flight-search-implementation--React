import { isEmpty } from 'lodash';
import { getShorthDate } from './flights';

const updateErrorFor = (key, errors) => {
    errors[key] = 'form-error';
    return errors;
};

const validateDate = (key, value, errors) => {
    if (!(value instanceof Date)) {
        updateErrorFor(key, errors);
    }
};

const validateReturnData = ({ returnDate, startDate, errors }) => {
    const end = getShorthDate(returnDate);
    const start = getShorthDate(startDate);
    if (!(new Date(`${end} 00:00`) > new Date(`${start} 00:00`))) {
        updateErrorFor('returnDate', errors);
    }
};

const validateObject = (key, value, errors) => {
    if (isEmpty(value)) {
        updateErrorFor(key, errors);
    }
};


export const validateSearchForm = ({ searchParams, isReturnTrip }) => {
    const errors = {};
    if (isReturnTrip) {
        validateDate('returnDate', searchParams.returnDate, errors);
        if (searchParams.returnDate) {
            validateReturnData({ returnDate: searchParams.returnDate,
                startDate: searchParams.startDate, errors });
        }
    }
    validateDate('startDate', searchParams.startDate, errors);
    validateObject('selectedOrigin', searchParams.selectedOrigin, errors);
    validateObject('selectedDestination', searchParams.selectedDestination, errors);

    if (searchParams.passengers <= 0 || (typeof searchParams.passengers !== 'number')) {
        updateErrorFor('passengers', errors);
    }

    if (searchParams.selectedOrigin && searchParams.selectedDestination) {
        if (searchParams.selectedOrigin.value === searchParams.selectedDestination.value) {
            errors.isDuplicateCity = 'Cannot select same cities!';
            errors.selectedOrigin = 'form-error';
            errors.selectedDestination = 'form-error';
        }
    }

    validateObject('priceRange', searchParams.priceRange, errors);

    return errors;
};

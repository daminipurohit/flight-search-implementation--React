/* eslint-disable max-len */

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const months = ['January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const getReadableFullDate = date => {
    const currMon = months[date.getMonth()];
    const currDay = weekDays[date.getDay()];
    const dateString = `${currDay}, ${date.getDate()} ${currMon}`;
    return dateString;
};

export const getTimeDifferenceInHrMns = (time1, time2) => {
    const diff = new Date(time1) - new Date(time2);
    const timeInMin = (diff / 1000 / 60);
    const hours = (timeInMin / 60);
    let actualhours = Math.floor(hours);
    const minutes = (hours - actualhours) * 60;
    if (actualhours >= 0 && actualhours <= 9) {
        actualhours = `0${actualhours}`;
    }
    const actualminutes = Math.round(minutes);
    return `${actualhours}h ${actualminutes}m`;
};

export const getShorthDate = date => {
    const mm = date.getMonth() + 1; // getMonth() is zero-based
    const dd = date.getDate();

    return [date.getFullYear(), '/',
        (mm > 9 ? '' : '0') + mm, '/',
        (dd > 9 ? '' : '0') + dd
    ].join('');
};

const getDiffMinutes = (dt1, dt2) => {
    let diff = (dt1.getTime() - dt2.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
};


export const getOneWayFlights = data => new Promise(resolve => {
    const { selectedOrigin: from, selectedDestination: to, startDate, allFlights, priceRange } = data;
    const date = getShorthDate(startDate);
    const direct = []; // has direct A-C flights => same dates
    const differentDestination = []; // same origin but diff dest , has A-B, A-D flights => same dates
    const differentOrigin = []; // different origin , B-C (same dest) => same dates
    const multiFlights = [];

    allFlights.forEach(all => {
        // check date
        if (all.date === date) {
            // check origin
            if (all.origin === from) {
                // check destination
                if (all.destination === to && (all.price <= priceRange.max && all.price >= priceRange.min)) {
                    // direct flight found
                    // check price for direct is between range
                    direct.push(all);
                } else if (all.destination !== to && (all.price <= priceRange.max && all.price >= priceRange.min)) {
                    // same origin but diff destination
                    differentDestination.push(all);
                }
            } else {
                // other origin
                if (all.destination === to && (all.price <= priceRange.max && all.price >= priceRange.min)) {
                    differentOrigin.push(all);
                }
                return null;
            }
        }
        return null;
    });

    // check diff des , dif ori array for multi flights

    differentDestination.forEach(diffDest => {
        differentOrigin.forEach(diffOrigin => {
            if (diffDest.destination === diffOrigin.origin) {
                if (new Date(`${diffOrigin.date} ${diffOrigin.departureTime}`) > new Date(`${diffDest.date} ${diffDest.arrivalTime}`)) {
                    const mins = getDiffMinutes(new Date(`${diffOrigin.date} ${diffOrigin.departureTime}`), new Date(`${diffDest.date} ${diffDest.arrivalTime}`));

                    if (mins >= 30) {
                        // price
                        const totalPrice = diffDest.price + diffOrigin.price;
                        if (totalPrice <= priceRange.max && totalPrice >= priceRange.min) {
                            multiFlights.push([diffDest, diffOrigin]);
                        }
                    }
                }
            }
        });
    });

    return resolve({
        direct,
        multiFlights
    });
});

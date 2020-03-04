import React from 'react';
import { shallow } from 'enzyme';
import { FlightSearchContainer } from './FlightSearchContainer';

describe('FlightSearchContainer', () => {
    it('should render correctly as default FlightSearchContainer', () => {
        const component = shallow(<FlightSearchContainer />);
        expect(component).hasClass('flight-search-container').to.equal(true);
        expect(component).toMatchSnapshot();
    });
});

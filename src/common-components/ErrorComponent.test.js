import React from 'react';
import { shallow } from 'enzyme';
import ErrorComponent from './ErrorComponent';

describe('ErrorComponent', () => {
    it('should render correctly', () => {
        const component = shallow(<ErrorComponent />);
        expect(component).toMatchSnapshot();
    });
});

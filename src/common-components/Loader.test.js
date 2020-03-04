import React from 'react';
import { shallow } from 'enzyme';
import Loader from './Loader';

describe('Loader', () => {
    it('should render correctly without prop', () => {
        const component = shallow(<Loader />);
        expect(component.hasClass('loader-container')).toBeTruthy();
        expect(component.find('.loader-message').text()).toBe('Loading data...');
        expect(component).toMatchSnapshot();
    });

    it('should render correctly with prop', () => {
        const component = shallow(<Loader loaderMsg="loading text added here" />);
        expect(component.hasClass('loader-container')).toBeTruthy();
        expect(component.find('.loader-message').text()).toBe('loading text added here');
        expect(component).toMatchSnapshot();
    });
});

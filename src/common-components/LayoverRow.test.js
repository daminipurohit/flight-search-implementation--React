import React from 'react';
import { shallow } from 'enzyme';
import LayoverRow from './LayoverRow';

describe('LayoverRow', () => {
    it('should render correctly', () => {
        const component = shallow(<LayoverRow layoverTime="2hr" />);
        expect(component).toMatchSnapshot();
    });
});

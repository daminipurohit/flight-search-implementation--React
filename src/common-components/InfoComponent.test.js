import React from 'react';
import { shallow } from 'enzyme';
import InfoComponent from './InfoComponent';

describe('InfoComponent', () => {
    it('should render correctly', () => {
        const component = shallow(<InfoComponent><div>I am child</div></InfoComponent>);
        expect(component).toMatchSnapshot();
    });
});

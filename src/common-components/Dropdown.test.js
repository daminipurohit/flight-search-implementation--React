import React from 'react';
import { mount } from 'enzyme';
import Dropdown from './Dropdown';

describe('Dropdown', () => {
    it('should render correctly', () => {
        const mockChangeCallBack = jest.fn();

        const options = [{ label: '1', value: '1' }];
        const component = mount(<Dropdown onChange={mockChangeCallBack} options={options} />);
        const input = component.find('Select').find('input');
        input.at(0).simulate('keyDown', { key: 'ArrowDown', keyCode: 40 });
        input.at(0).simulate('keyDown', { key: 'Enter', keyCode: 13 });
        expect(mockChangeCallBack).toHaveBeenCalled();
        expect(component).toMatchSnapshot();
        component.unmount();
    });
});

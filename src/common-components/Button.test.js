import React from 'react';
import { shallow } from 'enzyme';
import Button from './Button';

describe('Button', () => {
    it('should render correctly as default button', () => {
        const onClick = jest.fn();
        const props = {
            label: 'Default button',
            onClick
        };
        const component = shallow(<Button {...props} />);
        expect(component).toMatchSnapshot();
    });

    it('should render correctly as primary button', () => {
        const onClick = jest.fn();
        const props = {
            label: 'Primary button',
            onClick,
            primary: true
        };
        const component = shallow(<Button {...props} />);
        component.find('button').simulate('click');
        expect(onClick).toHaveBeenCalled();
        expect(component).toMatchSnapshot();
    });

    it('should render correctly as danger button', () => {
        const onClick = jest.fn();
        const props = {
            label: 'Danger button',
            onClick,
            danger: true
        };
        const component = shallow(<Button {...props} />);
        component.find('button').simulate('click');
        expect(onClick).toHaveBeenCalled();
        expect(component).toMatchSnapshot();
    });

    it('should render correctly as disabled button', () => {
        const onClick = jest.fn();
        const props = {
            label: 'Disabled button',
            onClick,
            disabled: true
        };
        const component = shallow(<Button {...props} />);
        expect(component.find('button').prop('disabled')).toBe(true);
        expect(component.find('button').hasClass('button-default  button-disabled')).toBe(true);
        expect(component).toMatchSnapshot();
    });
});

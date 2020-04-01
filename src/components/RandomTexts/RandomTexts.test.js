import React from 'react';
import { act } from 'react-dom/test-utils'
import { mount } from 'enzyme';

import RandomTexts from './RandomTexts';

jest.useFakeTimers();

let component;

const mountComponent = (props) => mount(<RandomTexts {...props} />);

describe('<RandomTexts />', () => {
  const props = {
    length: 10
  };

  beforeAll(() => {
    component = mountComponent(props);
  });

  it('should render text container', () => {
    const container = component.find("span");
    expect(container.exists()).toBe(true);
  });

  it('should render text with the defined length', () => {
    expect(component.text().length).toBe(props.length);
  });

  it('should change value when length prop changes', () => {
    const firstVal = component.text();
    component.setProps({ length: 5 });

    expect(component.text()).not.toBe(firstVal);
  });

  it('should change value at 300ms interval', () => {
    const firstVal = component.text();
    act(() => jest.advanceTimersByTime(300));
    const secondVal = component.text();
    act(() => jest.advanceTimersByTime(600));
    const thirdVal = component.text();
    expect(firstVal).not.toBe(secondVal);
    expect(secondVal).not.toBe(thirdVal);
  });
});
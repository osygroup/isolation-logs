import React from 'react';
import { mount } from 'enzyme';
import App from './App';

let component;
let container;

const mountComponent = (props) => mount(<App />);
const mainElement = () => component.find("main");

describe('<RandomTexts />', () => {
  beforeAll(() => {
    component = mountComponent();
    container = mainElement();
  });

  it('should render text conatiner', () => {
    expect(container.exists()).toBe(true);
  });
});

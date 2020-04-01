import React from 'react';
import { mount } from 'enzyme';

import IsolationDetails from './IsolationDetails';

import { getCurrentDate } from '../../shared/utils'

let component;

const mountComponent = (props) => mount(<IsolationDetails {...props} />);

describe('<IsolationDetails />', () => {
  const props = {
    length: 10
  };

  beforeAll(() => {
    component = mountComponent(props);
  });

  it('should render isolation details container', () => {
    const container = component.find('.isolationDetails')
    expect(container.exists()).toBe(true);
  });

  it(`renders today's date`, () => {
    const dateElem = component.find('time');
    expect(dateElem.text()).toBe(getCurrentDate())
  })
});
import React from 'react';
import { shallow } from 'enzyme';

import CounterForm from '../CounterForm';

const mockShowNotification = () => {};
const mockClearNotifications = () => {};

describe('CounterForm', () => {
  it('renders the form', () => {
    const wrapper = shallow(
      <CounterForm
        showNotification={mockShowNotification}
        clearNotifications={mockClearNotifications}
      />,
    );
    expect(wrapper.find('form')).toHaveLength(1);
  });

  it('changes the text of the number', () => {
    const wrapper = shallow(
      <CounterForm
        showNotification={mockShowNotification}
        clearNotifications={mockClearNotifications}
      />,
    );
    wrapper.find('input[name="number"]').simulate('change', {
      target: {
        value: '123',
      },
    });
    expect(
      wrapper
        .update()
        .find('input[name="number"]')
        .props().value,
    ).toEqual('123');

    expect(
      wrapper
        .update()
        .find('Paragraph')
        .text(),
    ).toEqual(
      "It'll take about 4 minutes to count to one hundred twenty-three.",
    );
  });
});

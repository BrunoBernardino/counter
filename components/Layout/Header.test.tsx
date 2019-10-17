import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import enzymify from 'expect-enzyme';

import * as T from 'lib/types';

import Header from './Header';

expect.extend(enzymify());

const defaultProps = {
  notifications: [],
  isShowingNotifications: false,
  hideNotifications: () => {},
};

describe('Header', () => {
  it('renders the Header without notifications', () => {
    const wrapper = shallow(<Header {...defaultProps} />);
    expect(wrapper.find('.Header__notification-wrapper').length).toEqual(0);
  });

  it('renders the Header with notifications', () => {
    const notification: T.Notification = {
      text: 'hello',
      type: 'valid',
    };
    const wrapper = shallow(
      <Header
        {...defaultProps}
        notifications={[notification]}
        isShowingNotifications
      />,
    );
    expect(wrapper.find('.Header__notification-wrapper').length).toEqual(1);
  });
});

import React, { Component } from 'react';
import Link from 'next/link';

import './Header.scss';

import * as T from 'lib/types';

interface HeaderProps {
  notifications: T.Notification[];
  isShowingNotifications: boolean;
  hideNotifications: () => void;
}
interface HeaderState {}

export default class Header extends Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);

    this.state = {};
  }

  handleNotificationsClick = (event: React.MouseEvent<HTMLElement>) => {
    const { hideNotifications } = this.props;

    event.preventDefault();

    hideNotifications();
  };

  render = () => {
    const { isShowingNotifications, notifications } = this.props;

    return (
      <header className="Header">
        <section className="Header__title-wrapper">
          <a href="https://brunobernardino.com" className="Header__logo">
            <img
              alt="Logo: a stylized snail and the letters brn"
              src="/static/images/logo.svg"
            />
          </a>
          <h1 className="Header__title">
            <Link href="/">
              <a>Counter</a>
            </Link>
          </h1>
        </section>
        <h2 className="Header__tagline">How big is this number?</h2>
        <h3 className="Header__description">Put numbers in perspective.</h3>
        {isShowingNotifications && notifications.length > 0 && (
          <>
            {notifications.map((notification, index) => (
              <div
                className="Header__notification-wrapper"
                key={index}
                onClick={this.handleNotificationsClick}
                role="button"
                tabIndex={index}
              >
                <div
                  className={`Header__notification Header__notification--${notification.type}`}
                  dangerouslySetInnerHTML={{ __html: notification.text }}
                />
              </div>
            ))}
          </>
        )}
      </header>
    );
  };
}

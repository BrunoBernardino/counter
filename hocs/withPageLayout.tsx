import { Component } from 'react';
import { withRouter } from 'next/router';
import Helmet from 'react-helmet';
import { WithRouterProps } from 'next/dist/client/with-router';

import { Header, Footer } from 'components/Layout';
import Loading from 'components/Loading';

import * as T from 'lib/types';

interface WithPageLayoutOptions {
  title?: string;
  description?: string;
  keywords?: string;
}
interface PageLayoutProps extends WithRouterProps {}
interface PageLayoutState {
  isLoading: boolean;
  isShowingNotifications: boolean;
  notifications: T.Notification[];
}

const AUTO_HIDE_NOTIFICATIONS_TIMEOUT_MS = 10 * 1000;

const withPageLayout: any = (
  WrappedComponent: any,
  { title, description, keywords }: WithPageLayoutOptions,
) => {
  class PageLayoutComponent extends Component<
    PageLayoutProps,
    PageLayoutState
  > {
    autoHideNotificationsTimeout: number;

    constructor(props: PageLayoutProps) {
      super(props);

      this.state = {
        isLoading: true,
        isShowingNotifications: false,
        notifications: [],
      };
    }

    componentDidMount() {
      this.hideLoading();
    }

    componentWillUnmount() {
      this.clearNotificationTimeout();
    }

    clearNotificationTimeout = () => {
      if (this.autoHideNotificationsTimeout) {
        clearTimeout(this.autoHideNotificationsTimeout);
      }
    };

    showLoading = () => {
      this.setState({ isLoading: true });
    };

    hideLoading = () => {
      this.setState({ isLoading: false });
    };

    showNotifications = () => {
      this.setState({ isShowingNotifications: true });
      this.clearNotificationTimeout();
      this.autoHideNotificationsTimeout = setTimeout(
        this.hideNotifications,
        AUTO_HIDE_NOTIFICATIONS_TIMEOUT_MS,
      );
    };

    clearNotifications = () => {
      this.setState({ isShowingNotifications: false, notifications: [] });
    };

    hideNotifications = () => {
      this.setState({ isShowingNotifications: false, notifications: [] });
    };

    addNotification = (
      text: T.Notification['text'],
      type: T.Notification['type'],
    ) => {
      this.setState(
        ({ notifications }) => ({
          notifications: [...notifications, { text, type }],
        }),
        this.showNotifications,
      );
    };

    render = () => {
      const { isLoading, isShowingNotifications, notifications } = this.state;

      const metaTags = [
        { property: 'og:title', content: title },
        {
          name: 'description',
          content: description,
        },
        {
          name: 'keywords',
          content: keywords,
        },
      ];

      const SEOOverride: JSX.Element =
        title && description ? <Helmet title={title} meta={metaTags} /> : null;

      return (
        <>
          {SEOOverride}
          <Loading isShowing={isLoading} />
          <div className="wrapper">
            <Header
              isShowingNotifications={isShowingNotifications}
              notifications={notifications}
              hideNotifications={this.hideNotifications}
            />
            <WrappedComponent
              {...this.props}
              showLoading={this.showLoading}
              hideLoading={this.hideLoading}
              showNotification={this.addNotification}
              clearNotifications={this.clearNotifications}
            />
            <Footer />
          </div>
        </>
      );
    };
  }

  return withRouter(PageLayoutComponent);
};

export default withPageLayout;

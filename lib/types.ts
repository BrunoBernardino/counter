import { NextRouter } from 'next/router';

export interface WrappedComponentProps {
  router: NextRouter;
  showLoading: () => void;
  hideLoading: () => void;
  showNotification: (
    text: Notification['text'],
    type: Notification['type'],
  ) => void;
  clearNotifications: () => void;
}

export interface Notification {
  text: string;
  type: 'valid' | 'invalid';
}

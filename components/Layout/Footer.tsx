import { Component } from 'react';

import './Footer.scss';

interface FooterProps {}
interface FooterState {}

export default class Footer extends Component<FooterProps, FooterState> {
  render = () => {
    return (
      <footer className="Footer">
        <h3 className="Footer__title">
          by <a href="https://brunobernardino.com">Bruno Bernardino</a> |{' '}
          <a href="https://github.com/BrunoBernardino/counter">view source</a>
        </h3>
      </footer>
    );
  };
}

import React from 'react';
import App from 'next/app';
import Helmet from 'react-helmet';

import {
  defaultTitle,
  defaultDescription,
  defaultKeywords,
} from 'lib/constants';

import 'styles/main.scss';
import 'styles/_common.scss';

const defaultMetaTags = [
  {
    name: 'viewport',
    content: 'width=device-width, initial-scale=1',
  },
  { property: 'og:title', content: defaultTitle },
  { charset: 'utf-8' },
  {
    name: 'description',
    content: defaultDescription,
  },
  {
    name: 'keywords',
    content: defaultKeywords,
  },
  {
    name: 'theme-color',
    content: '#ffffff',
  },
];

const linkItems = [
  {
    rel: 'icon',
    type: 'image/png',
    href: '/static/images/favicon.png',
  },
  {
    rel: 'apple-touch-icon',
    href: '/static/images/favicon.png',
  },
];

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Helmet title={defaultTitle} meta={defaultMetaTags} link={linkItems} />
        <Component {...pageProps} />
      </>
    );
  }
}

export default MyApp;

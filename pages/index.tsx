import React from 'react';
import axios from 'axios';

import { withPageLayout } from 'hocs';
import Title from 'components/Title';
import Paragraph from 'components/Paragraph';
import TextBlock from 'components/TextBlock';
import CounterForm from 'modules/counter/CounterForm';

import {
  defaultTitle,
  defaultDescription,
  defaultKeywords,
} from 'lib/constants';

import * as T from 'lib/types';

export interface IndexPageProps extends T.WrappedComponentProps {}

const IndexPage = (props: IndexPageProps) => (
  <div className="index common">
    <TextBlock>
      <Title>Type in a number below</Title>
      <Paragraph>
        It'll automatically calculate how long it should take for a human to
        count to it (in US English).
      </Paragraph>
    </TextBlock>

    <CounterForm {...props} />

    <TextBlock>
      <Title>Want to learn more?</Title>
      <Paragraph isCentered>
        <a href="https://news.onbrn.com/putting-numbers-in-perspective">
          Here's my motivation to build this micro app
        </a>
        .
      </Paragraph>
    </TextBlock>

    <TextBlock>
      <Title>Note after millions</Title>
      <Paragraph isCentered>
        <a href="https://en.wikipedia.org/wiki/Billion">
          The written numbers are in short scale
        </a>{' '}
        (i.e. 1 billion is one thousand millions, not one million millions).
      </Paragraph>
    </TextBlock>
  </div>
);

export const getServerSideProps = async ({ req }: { req: Request }) => {
  // @ts-ignore it does exist
  if (req && req.headers && !req.headers.host.startsWith('localhost')) {
    const baseUrl = 'https://counter.onbrn.com';
    const pathname = req.url;

    try {
      await axios.post('https://stats.onbrn.com/api/event', {
        headers: {
          'content-type': 'application/json; charset=utf-8',
        },
        body: {
          domain: baseUrl.replace('https://', ''),
          name: 'pageview',
          url: `${baseUrl}${pathname}`,
        },
      });
    } catch (error) {
      console.log('Failed to log pageview');
      console.error(error);
    }
  }

  return {
    props: {},
  };
};

export default withPageLayout(IndexPage, {
  title: defaultTitle,
  description: defaultDescription,
  keywords: defaultKeywords,
});

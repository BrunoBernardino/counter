import React, { ChangeEvent, MouseEvent, FormEvent } from 'react';
import numberConverter from 'number-to-words';
import moment from 'moment';
import styled from 'styled-components';

import { getTotalSecondsToCountTo } from 'lib/utils';
import Paragraph from 'components/Paragraph';
import TextBlock from 'components/TextBlock';

import * as T from 'lib/types';

const AnswerBlock = styled(TextBlock)`
  margin-top: 20px;
  border: none;
`;

export interface CounterFormProps extends T.WrappedComponentProps {}

export interface CounterFormState {
  number: string;
  parsedNumber: number;
  numberText: string;
  countEstimate: string;
}

export default class CounterForm extends React.Component<
  CounterFormProps,
  CounterFormState
> {
  private numberInput: React.RefObject<HTMLInputElement>;

  constructor(props: CounterFormProps) {
    super(props);

    this.numberInput = React.createRef();

    this.state = {
      number: '',
      parsedNumber: 0,
      numberText: '',
      countEstimate: '',
    };
  }

  componentDidMount() {
    const input = this.numberInput.current;
    if (input) {
      input.focus();
    }
  }

  handleNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const number = event.target.value;

    this.setState({ number }, this.calculateEstimate.bind(this, true));
  };

  calculateEstimate = async (ignoreEmpty = false) => {
    const { showNotification, clearNotifications } = this.props;
    const { number } = this.state;

    clearNotifications();

    if (number === '' && ignoreEmpty) {
      this.setState({ parsedNumber: 0, numberText: '', countEstimate: '' });
      return;
    }

    const parsedNumber = parseInt(number, 10);

    if (Number.isNaN(parsedNumber)) {
      showNotification(
        "That doesn't seem to be a number, sorry!<br />Please try an integer.",
        'invalid',
      );
      this.setState({ parsedNumber: 0, numberText: '', countEstimate: '' });
      return;
    }

    if (parsedNumber === 42) {
      this.setState({
        numberText: 'Ultimate Question of Life, the Universe, and Everything',
        countEstimate: 'eons',
      });
      return;
    }

    const numberText = numberConverter.toWords(parsedNumber);

    const seconds = getTotalSecondsToCountTo(parsedNumber);

    const countEstimate = moment.duration({ seconds }).humanize();

    this.setState({ parsedNumber, numberText, countEstimate });
  };

  handleSubmit = async (
    event: MouseEvent<HTMLElement> | FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    this.calculateEstimate();
  };

  render() {
    const { number, parsedNumber, numberText, countEstimate } = this.state;

    return (
      <form className="common__form" onSubmit={this.handleSubmit}>
        <input
          ref={this.numberInput}
          name="number"
          type="text"
          className="common__input"
          placeholder="Type your number here, like 100"
          value={number}
          onChange={this.handleNumberChange}
        />

        <button
          onClick={this.handleSubmit}
          type="button"
          className="common__button"
        >
          How long will it take?
        </button>

        {numberText && countEstimate && (
          <AnswerBlock>
            <Paragraph isCentered>
              It'll take {parsedNumber <= 46 ? '' : 'about '}
              <strong>{countEstimate}</strong> to{' '}
              {countEstimate === 'eons' ? 'answer the' : 'count to'}{' '}
              {numberText}.
            </Paragraph>
          </AnswerBlock>
        )}
      </form>
    );
  }
}

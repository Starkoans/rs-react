import { Component } from 'react';
import { messages } from '../sources/messages';

export class SimulateError extends Component<object, { isClicked: boolean }> {
  constructor(props: object) {
    super(props);
    this.state = { isClicked: false };
  }
  render() {
    if (this.state.isClicked) {
      throw new Error('Simulated error');
    }
    return (
      <button
        onClick={() => {
          this.setState({ isClicked: true });
        }}
      >
        {messages.buttons.simulateError}
      </button>
    );
  }
}

import { Component } from 'react';
import { messages } from '../sources/messages';

interface Props {
  children?: React.ReactNode;
}

export class Header extends Component<Props> {
  render() {
    return (
      <header>
        <h1>{messages.headers.appName}</h1>
        {this.props.children}
      </header>
    );
  }
}

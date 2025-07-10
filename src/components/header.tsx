import { Component } from 'react';

interface Props {
  children?: React.ReactNode;
}

export class Header extends Component<Props> {
  render() {
    return (
      <header>
        <h1>Cats API</h1>
        {this.props.children}
      </header>
    );
  }
}

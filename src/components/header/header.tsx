import { Component } from 'react';
import { messages } from '../../sources/messages';
import styles from './header.module.css';

interface Props {
  children?: React.ReactNode;
}

export class Header extends Component<Props> {
  render() {
    return (
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>{messages.headers.appName}</h1>
        {this.props.children}
      </header>
    );
  }
}

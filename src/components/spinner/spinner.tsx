import { Component } from 'react';
import styles from './spinner.module.css';
import { CatIcon } from '@/assets/cat-icon';

export class Spinner extends Component {
  render(): React.ReactNode {
    return (
      <div className={styles.spinner}>
        <CatIcon />
      </div>
    );
  }
}

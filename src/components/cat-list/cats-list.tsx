import styles from './cat-list.module.css';
import { Component } from 'react';
import type { Cat } from '../../sources/types/cat';
import { messages } from '../../sources/messages';
import { Spinner } from '../spinner/spinner';
import { CatCard } from '../cat-card/cat-card';

interface CatsListProps {
  cats: Cat[];
  isLoading?: boolean;
  error?: string | null;
}
interface CatsListState {
  cats: Cat[];
}

export class CatsList extends Component<CatsListProps, CatsListState> {
  constructor(props: CatsListProps) {
    super(props);
    this.state = {
      cats: props.cats,
    };
  }

  render(): React.ReactNode {
    if (this.props.isLoading) {
      return <Spinner />;
    }

    if (this.props.error) {
      return (
        <>
          <p className="error">{messages.errors.oops}</p>
          <p className="error">{this.props.error || messages.errors.default}</p>
        </>
      );
    }

    if (this.props.cats.length === 0) {
      return <p>{messages.noCatsFound}</p>;
    }

    return (
      <ul className={styles.catsList}>
        {this.props.cats.map((cat, index) => (
          <li key={index} className={styles.listItem}>
            <CatCard cat={cat} />
          </li>
        ))}
      </ul>
    );
  }
}

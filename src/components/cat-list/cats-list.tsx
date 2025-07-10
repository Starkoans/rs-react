import styles from './cat-list.module.css';
import { Component } from 'react';
import type { Cat } from '../../sources/types/cat';
import { messages } from '../../sources/messages';

interface CatsListProps {
  cats: Cat[];
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
    if (this.props.cats.length === 0) {
      return <p>{messages.noCatsFound}</p>;
    }
    return (
      <ul className={styles.catsList}>
        {this.props.cats.map((cat, index) => (
          <li key={index} className={styles.listItem}>
            <a href={cat.wikipedia_url} target="blanc">
              {cat.name}
            </a>
            <p>{cat.description}</p>
          </li>
        ))}
      </ul>
    );
  }
}

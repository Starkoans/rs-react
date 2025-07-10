import { Component } from 'react';
import type { Cat } from '../types/cat';

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
      return <p>No cats found</p>;
    }
    return (
      <ul>
        {this.props.cats.map((cat, index) => (
          <li key={index}>
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

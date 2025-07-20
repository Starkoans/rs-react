import { Component, type ReactNode } from 'react';
import type { Cat } from '../../sources/types/cat';
import styles from './cat-card.module.css';
import { fetchCatImage } from '../../api/fetch-cat-image';

interface Props {
  cat: Cat;
}

interface State {
  cat: Cat;
  catImgUrl: string;
}

export class CatCard extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      cat: this.props.cat,
      catImgUrl: '',
    };
  }

  async componentDidMount(): Promise<void> {
    const img = await fetchCatImage(this.props.cat.reference_image_id);
    this.setState({ catImgUrl: img.url });
  }

  render(): ReactNode {
    return (
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          {this.state.catImgUrl && (
            <img
              src={this.state.catImgUrl}
              alt={this.props.cat.name}
              className={styles.image}
            />
          )}
        </div>

        <a href={this.props.cat.wikipedia_url} target="blanc">
          <h2>{this.props.cat.name}</h2>
        </a>
        <p className={styles.description}>{this.props.cat.description}</p>
      </div>
    );
  }
}

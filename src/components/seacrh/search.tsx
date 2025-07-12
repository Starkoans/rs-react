import { Component } from 'react';

import { messages } from '../../sources/messages';
import { LSKeys } from '../../sources/ls-keys';
import styles from './Search.module.css';

interface SearchState {
  searchInput: string;
}

interface SearchProps {
  value: string;
  onSearch: (searchInput: string) => void;
}

export class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      searchInput: props.value,
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      this.handleSearchButtonClick();
    }
  };

  componentDidUpdate(prevProps: SearchProps) {
    if (this.props.value !== prevProps.value) {
      this.setState({ searchInput: this.props.value });
    }
  }

  handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchInput: event.target.value });
    localStorage.setItem(LSKeys.SearchInput, event.target.value);
  };

  handleSearchButtonClick = () => {
    this.props.onSearch(this.state.searchInput);
  };

  render() {
    return (
      <div className={styles.container}>
        <input
          className={styles.input}
          placeholder={messages.input.search}
          value={this.state.searchInput}
          onChange={this.handleInputChange}
        />
        <button
          className={styles.button}
          onClick={this.handleSearchButtonClick}
        >
          {messages.buttons.search}
        </button>
      </div>
    );
  }
}

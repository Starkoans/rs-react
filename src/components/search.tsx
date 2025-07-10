import { Component } from 'react';

interface HeaderState {
  searchInput: string;
}
interface SearchProps {
  value: string;
  onSearch: (searchInput: string) => void;
}

export class Search extends Component<SearchProps, HeaderState> {
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

  handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchInput: event.target.value });
    localStorage.setItem('searchInput', event.target.value);
  };

  componentDidUpdate(prev: SearchProps) {
    if (prev.value !== this.props.value) {
      this.setState({ searchInput: this.props.value });
    }
  }

  handleSearchButtonClick = () => {
    this.props.onSearch(this.state.searchInput);
  };

  render() {
    return (
      <>
        <input
          placeholder="search"
          value={this.state.searchInput}
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleSearchButtonClick}>Search</button>
      </>
    );
  }
}

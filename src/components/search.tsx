import { Component } from 'react';
import { messages } from '../sources/messages';
import { LSKeys } from '../sources/ls-keys';

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
    localStorage.setItem(LSKeys.SearchInput, event.target.value);
  };

  handleSearchButtonClick = () => {
    this.props.onSearch(this.state.searchInput);
  };

  render() {
    return (
      <>
        <input
          placeholder={messages.input.search}
          value={this.state.searchInput || this.props.value}
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleSearchButtonClick}>
          {messages.buttons.search}
        </button>
      </>
    );
  }
}

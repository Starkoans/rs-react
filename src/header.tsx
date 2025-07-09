import { Component } from 'react';

interface HeaderState {
  searchInput: string;
}

export class Header extends Component<object, HeaderState> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchInput: 'Welcome to My App',
    };
  }

  componentDidMount() {
    const savedInput = localStorage.getItem('searchInput');
    this.setState({ searchInput: savedInput || '' });
  }

  componentDidUpdate() {
    localStorage.setItem('searchInput', this.state.searchInput);
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchInput: event.target.value });
  };

  render() {
    return (
      <>
        <input
          placeholder="search"
          value={this.state.searchInput}
          onChange={this.handleInputChange}
        />
      </>
    );
  }
}

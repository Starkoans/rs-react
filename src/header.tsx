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

  handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchInput: event.target.value });

    const response = await fetch(
      `https://api.thecatapi.com/v1/breeds/search?q=${event.target.value}`
    );
    if (response.ok) {
      const data = await response.json();
      console.log(data);
    }
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

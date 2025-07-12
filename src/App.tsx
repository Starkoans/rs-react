import './App.css';
import { Component } from 'react';
import { CatsList } from './components/cat-list/cats-list';
import type { Cat } from './sources/types/cat';
import { fetchCats } from './api/fetch-cats-breed';
import { Search } from './components/seacrh/search';
import { Header } from './components/header/header';
import { SimulateError } from './components/simulate-error';
import { ErrorBoundary } from './components/error-boundary/error-boundary';

interface AppState {
  cats: Cat[];
  loading: boolean;
  error: string | null;
  searchInput: string;
}

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      cats: [],
      loading: true,
      error: null,
      searchInput: '',
    };
  }

  async componentDidMount() {
    const savedInput = localStorage.getItem('searchInput');
    this.setState({ searchInput: savedInput || '' });
    await this.getCats(savedInput || '');
  }

  handleSearch = async (searchInput: string) => {
    await this.getCats(searchInput);
  };

  getCats = async (searchInput: string) => {
    this.setState({ loading: true, error: null });
    try {
      const cats = await fetchCats(searchInput);
      this.setState({ cats });
    } catch (error) {
      const err = error instanceof Error ? error.message : 'Unknown error';
      this.setState({ error: err });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <ErrorBoundary>
        <Header>
          <Search onSearch={this.handleSearch} value={this.state.searchInput} />
          <SimulateError />
        </Header>
        <CatsList
          cats={this.state.cats}
          isLoading={this.state.loading}
          error={this.state.error}
        />
      </ErrorBoundary>
    );
  }
}

export default App;

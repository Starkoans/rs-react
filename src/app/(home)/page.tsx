import { SearchBar } from './search-bar';
import { CatsListPaginated } from './cats-list-paginated';

export default function HomePage() {
  return (
    <>
      <SearchBar />
      <CatsListPaginated />
    </>
  );
}

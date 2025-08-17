import { SearchBar } from '../../../components/search-bar/search-bar';

interface Props {
  children: React.ReactNode;
}

export default function CatalogLayout({ children }: Props) {
  return (
    <>
      <SearchBar />
      {children}
    </>
  );
}

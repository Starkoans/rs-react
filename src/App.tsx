import { SearchBar } from "./components/search-bar";
import { Table } from "./components/table/table";
import { Suspense } from "react";
import { TableSkeleton } from "./components/table/table-skeleton";
import { HeadersSelector } from "./components/headers-selector";

function App() {
	return (
		<>
			<SearchBar />
			<HeadersSelector />
			<Suspense fallback={<TableSkeleton />}>
				<Table />
			</Suspense>
		</>
	);
}

export default App;

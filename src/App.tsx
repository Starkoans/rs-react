import { useSuspenseQuery } from "@tanstack/react-query";
import { SearchBar } from "./components/search-bar";
import { Table } from "./components/coutries-table/table";
import { fetchCountries } from "./api/fetch-countries";
import { Suspense } from "react";
import type { Countries } from "./source/types";
import { TableSkeleton } from "./components/coutries-table/skeleton";

const CountriesTable = () => {
	const { data } = useSuspenseQuery<Countries>({
		queryKey: ["Countries"],
		queryFn: fetchCountries,
	});
	return <Table data={data} />;
};

function App() {
	return (
		<>
			<SearchBar />
			<Suspense fallback={<TableSkeleton />}>
				<CountriesTable />
			</Suspense>
		</>
	);
}

export default App;

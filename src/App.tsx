import { useSuspenseQuery } from "@tanstack/react-query";
import { SearchBar } from "./components/search-bar";
import { Table } from "./components/countries-table/table";
import { fetchCountries } from "./api/fetch-countries";
import { Suspense } from "react";
import type { Countries } from "./source/types";
import { TableSkeleton } from "./components/countries-table/table-skeleton";
import { getCountriesByYear } from "./utils/get-countries-by-year";
import { HeadersSelector } from "./components/headers-selector";

const CountriesTable = () => {
	const { data } = useSuspenseQuery<Countries>({
		queryKey: ["Countries"],
		queryFn: fetchCountries,
	});
	const countries = getCountriesByYear(data);
	return <Table data={countries} />;
};

function App() {
	return (
		<>
			<SearchBar />
			<HeadersSelector />
			<Suspense fallback={<TableSkeleton />}>
				<CountriesTable />
			</Suspense>
		</>
	);
}

export default App;

import { useSuspenseQuery } from "@tanstack/react-query";
import { SearchBar } from "./components/search-bar";
import { Table } from "./components/countries-table/table";
import { fetchCountries } from "./api/fetch-countries";
import { Suspense, useEffect, useMemo, useState, useTransition } from "react";
import type { Countries } from "./source/types";
import { TableSkeleton } from "./components/countries-table/table-skeleton";
import { getCountriesByYear } from "./utils/get-countries-by-year";
import { HeadersSelector } from "./components/headers-selector";
import { useStore } from "./store/store";

const CountriesTable = () => {
	const filters = useStore.use.filters();
	const { data } = useSuspenseQuery<Countries>({
		queryKey: ["Countries"],
		queryFn: fetchCountries,
	});

	const [filtered, setFiltered] = useState<Countries>();

	useEffect(() => {
		const filterData = async () => {
			const filt = await getCountriesByYear(data, filters.year);
			setFiltered(filt);
		};
		filterData();
	}, [filters.year]);

	if (!filtered || Object.values(filtered).length === 0) return <>Не найдено</>;
	return <Table data={filtered} />;
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

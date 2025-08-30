import type {

	columnKey,
	Countries,
	Emissions,
	TableRow,
} from "../../source/types";

import styles from "./table.module.css";
import { useStore } from "../../store/store";
import { headers } from "../../source/headers";
import { useEffect, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchCountries } from "../../api/fetch-countries";
import { filterData } from "../../utils/filter-data";
import { transformCountriesToTableRows } from "../../utils/transform-countries-to-table-rows";



export const Table = () => {
	const filters = useStore.use.filters();
	const columns = useStore.use.tableHeaders();

	const { data } = useSuspenseQuery<Countries, Error, TableRow[]>({
		queryKey: ["Countries"],
		queryFn: fetchCountries,
		select: transformCountriesToTableRows,
	});

	const [filtered, setFiltered] = useState<TableRow[]>();

	useEffect(() => {
		setFiltered(filterData(data, filters));
	}, [filters]);

	if (!filtered || Object.values(filtered).length === 0) return <>Не найдено</>;
	
	return (
		<>
			<div className={styles.tableWrap}>
				<table>
					<thead>
						<tr>
							{columns.map((name, ind) => (
								<th key={ind}>{headers[name]}</th>
							))}
						</tr>
					</thead>
					<tbody>
						{filtered.map((row) => (
							<tr key={`${row.name}-${row.year}`}>
								{columns.map((headerKey) => {
									return (
										<td key={headerKey}>
											{row[headerKey as columnKey] || (
												<p className={styles.noDataLabel}>N/A</p>
											)}
										</td>
									);
								})}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
};

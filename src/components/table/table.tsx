import type { columnKey, Countries, TableRow } from "../../source/types";

import cx from "classnames";
import styles from "./table.module.css";
import { useStore } from "../../store/store";
import { headers } from "../../source/headers";
import { useEffect, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchCountries } from "../../api/fetch-countries";
import { filterData } from "../../utils/filter-data";
import { transformCountriesToTableRows } from "../../utils/transform-countries-to-table-rows";
import { VscTriangleDown, VscTriangleUp } from "react-icons/vsc";

export const Table = () => {
	const filters = useStore.use.filters();
	const toggleSort = useStore.use.toggleSort();
	const columns = useStore.use.tableHeaders();

	const { data } = useSuspenseQuery<Countries, Error, TableRow[]>({
		queryKey: ["Countries"],
		queryFn: fetchCountries,
		select: transformCountriesToTableRows,
	});

	const [filtered, setFiltered] = useState<TableRow[]>([]);
	const [isUpdated, setIsUpdated] = useState(false);

	useEffect(() => {
		setFiltered(filterData(data, filters));
		setIsUpdated(true);

		setTimeout(() => {
			setIsUpdated(false);
		}, 3000);
	}, [filters]);

	if (!filtered || filtered.length === 0) return <>Не найдено</>;

	return (
		<>
			<div className={cx(styles.tableWrap)}>
				<table>
					<thead>
						<tr>
							{columns.map((name, ind) => (
								<th key={ind} className={cx({ [styles.updated]: isUpdated })}>
									{headers[name]}
									<button
										onClick={() => toggleSort(name)}
										className={cx(styles.sortBtn)}
									>
										<VscTriangleUp
											className={cx(styles.sortIcon, {
												[styles.active]:
													filters.sortBy?.key === name &&
													filters.sortBy.dir === "ASC",
											})}
										/>
										<VscTriangleDown
											className={cx(styles.sortIcon, {
												[styles.active]:
													filters.sortBy?.key === name &&
													filters.sortBy.dir === "DESC",
											})}
										/>
									</button>
								</th>
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

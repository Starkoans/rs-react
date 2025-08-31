import type { columnKey, Countries, TableRow } from "../../source/types";
import cx from "classnames";
import styles from "./table.module.css";
import { useStore } from "../../store/store";
import { useEffect, useMemo, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchCountries } from "../../api/fetch-countries";
import { filterData } from "../../utils/filter-data";
import { transformCountriesToTableRows } from "../../utils/transform-countries-to-table-rows";
import { TableHeader } from "./table-header";
import { TableBodyMemo } from "./table-body";

export const Table = () => {
	const filters = useStore.use.filters();
	const columns = useStore.use.tableHeaders();

	const { data } = useSuspenseQuery<Countries, Error, TableRow[]>({
		queryKey: ["Countries"],
		queryFn: fetchCountries,
		select: transformCountriesToTableRows,
	});

	const [isUpdated, setIsUpdated] = useState(false);
	const rows = useMemo(() => filterData(data, filters), [data, filters]);

	useEffect(() => {
		setIsUpdated(true);

		setTimeout(() => {
			setIsUpdated(false);
		}, 3000);
	}, [filters, rows]);

	if (rows.length === 0) return <>Не найдено</>;

	return (
		<>
			<div className={cx(styles.tableWrap)}>
				<table>
					<TableHeader
						columns={columns}
						isUpdated={isUpdated}
						key={JSON.stringify(filters)}
					/>
					<TableBodyMemo rows={rows} columns={columns} />
				</table>
			</div>
		</>
	);
};

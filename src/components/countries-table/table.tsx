import type { columnKey, Countries, Emissions, TableRow } from "../../source/types";

import styles from "./table.module.css";
import { useStore } from "../../store/store";
import { headers } from "../../source/headers";

interface Props {
	data: Countries;
}

export const adaptDataForTable = (data: Countries): TableRow[] => {
	return Object.entries(data).flatMap(([name, country]) => {
		const lastEmissions: Emissions | undefined = country.data.at(-1);
		if (!lastEmissions) return [];

		const emissions = Object.fromEntries(
			Object.entries(lastEmissions).map(([k, v]) => [k, String(v)])
		) as Record<keyof Emissions, string>;

		const row: TableRow = {
			name,
			iso_code: country.iso_code,
			...emissions,
		};

		return [row];
	});
};

export const Table = ({ data }: Props) => {
	const rows: TableRow[] = adaptDataForTable(data);
	const columns = useStore.use.tableHeaders();

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
						{rows.map((row, ind) => (
							<tr key={row.iso_code || ind}>
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

import type { Countries } from "../../source/types";
import { type columnKey, type TableRow } from "../../source/headers";
import styles from "./table.module.css";
import { useStore } from "../../store/store";

interface Props {
	data: Countries;
}

const adaptDataForTable = (data: Countries): TableRow[] => {
	const rows: TableRow[] = Object.entries(data).map(([key, value]) => {
		const emissions = value.data[0];

		return {
			name: key,
			iso_code: value.iso_code,
			...emissions,
		};
	});
	return rows;
};

export const Table = ({ data }: Props) => {
	const rows: TableRow[] = adaptDataForTable(data);
	const selectedHeaders = useStore.use.tableHeaders();

	return (
		<>
			<div className={styles.tableWrap}>
				<table>
					<thead>
						<tr>
							{Object.entries(selectedHeaders).map(([key, name]) => (
								<th key={key}>{name}</th>
							))}
						</tr>
					</thead>
					<tbody>
						{rows.map((row) => (
							<tr key={row.iso_code}>
								{Object.keys(selectedHeaders).map((headerKey) => (
									<td key={headerKey}>
										{row[headerKey as columnKey] || (
											<p className={styles.noDataLabel}>N/A</p>
										)}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
};

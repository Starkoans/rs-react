import { memo, type FC } from "react";
import type { columnKey, TableRow } from "../../source/types";
import styles from "./table.module.css";

interface Props {
	rows: TableRow[];
	columns: columnKey[];
}

const TableBody: FC<Props> = ({ rows, columns }) => {
	return (
		<tbody>
			{rows.map((row) => (
				<tr key={`${row.name}-${row.year}`}>
					{columns.map((key) => (
						<td key={key}>
							{row[key] ?? <span className={styles.noDataLabel}>N/A</span>}
						</td>
					))}
				</tr>
			))}
		</tbody>
	);
};

const arePropsEqual = (prevProps: Props, nextProps: Props) =>
	prevProps.rows === nextProps.rows &&
	prevProps.columns.length === nextProps.columns.length &&
	prevProps.columns.every((v, i) => Object.is(v, nextProps.columns[i]));

export const TableBodyMemo = memo(TableBody, arePropsEqual);

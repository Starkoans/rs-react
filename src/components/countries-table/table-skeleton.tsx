import type { FC } from "react";
import styles from "./table-skeleton.module.css";
import { defaultHeaders } from "../../source/default-headers";

type Props = {
	rows?: number;
	cols?: number;
};

export const TableSkeleton: FC<Props> = ({
	rows = 8,
	cols = Object.keys(defaultHeaders).length,
}) => {
	return (
		<table>
			<thead>
				<tr>
					{Array.from({ length: cols }).map((_, i) => (
						<th key={i}>
							<div className={styles.skel} />
						</th>
					))}
				</tr>
			</thead>

			<tbody>
				{Array.from({ length: rows }).map((_, r) => (
					<tr key={r}>
						{Array.from({ length: cols }).map((_, c) => (
							<td key={c}>
								<div className={styles.skel} />
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
};

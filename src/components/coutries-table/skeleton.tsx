import type { FC } from "react";
import styles from "./skeleton.module.css";
import { headers } from "./headers";

type Props = {
	rows?: number;
};

export const TableSkeleton: FC<Props> = ({ rows = 8 }) => {
	return (
		<div className={styles.wrapper} aria-busy="true" aria-live="polite">
			<table className={styles.table} aria-label="Loading table">
				<thead>
					<tr>
						{headers.map((_, i) => (
							<th key={i}>
								<div className={styles.skel} />
							</th>
						))}
					</tr>
				</thead>

				<tbody>
					{Array.from({ length: rows }).map((_, r) => (
						<tr key={r}>
							{headers.map((_, c) => (
								<td key={c}>
									<div className={styles.skel} />
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

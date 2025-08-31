import { VscTriangleDown, VscTriangleUp } from "react-icons/vsc";
import { headers } from "../../source/headers";
import { useStore } from "../../store/store";
import styles from "./table.module.css";
import cx from "classnames";
import type { FC } from "react";
import type { columnKey } from "../../source/types";

interface TableHeaderProps {
	isUpdated?: boolean;
	columns: columnKey[];
}

export const TableHeader: FC<TableHeaderProps> = ({ isUpdated , columns}) => {
	const toggleSort = useStore.use.toggleSort();
	const filters = useStore.use.filters();

	return (
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
	);
};

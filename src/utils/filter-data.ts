import type { Filters, TableRow } from "../source/types";

export const filterData = (rows: TableRow[], filters?: Filters): TableRow[] => {
	const filterByName = (row: TableRow) => {
		const q = filters?.countryName?.trim();
		if (!q) return true;
		return row.name.toLowerCase().includes(q.toLowerCase());
	};

	const filterByYear = (row: TableRow) => {
		if (filters?.year == null) return row.year === 2023;
		return row.year === filters.year;
	};

	const filtered = rows.filter((row) => filterByName(row) && filterByYear(row));

	const sortBy = filters?.sortBy;
	if (!sortBy) return filtered;

	const { key, dir } = sortBy;

	const compare = (a: TableRow, b: TableRow): number => {
		const va = a[key] ?? 0;
		const vb = b[key] ?? 0;

		if (typeof va === "number" && typeof vb === "number") {
			return va - vb;
		}
		if (typeof va === "string" && typeof vb === "string") {
			const vaLow = va.toLowerCase();
			const vbLow = vb.toLowerCase();
			return vaLow > vbLow ? 1 : -1;
		}
		return 0;
	};

	const sorted = filtered.sort((a, b) =>
		dir === "DESC" ? -compare(a, b) : compare(a, b)
	);

	return sorted;
};

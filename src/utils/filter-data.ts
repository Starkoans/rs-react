import type { Filters, TableRow } from "../source/types";

export const filterData = (rows: TableRow[], filters?: Filters): TableRow[] => {
	const searchQuery = filters?.countryName?.trim();
	const filteredByName = searchQuery
		? rows.filter((row) =>
				row.name.toLowerCase().includes(searchQuery.toLowerCase())
		  )
		: rows;

	const year = filters?.year ?? 2023;
	const filteredByYear = filteredByName.filter((row) => row.year === year);

	const sortBy = filters?.sortBy;
	if (!sortBy) return filteredByYear;

	const compare = (a: TableRow, b: TableRow): number => {
		const va = a[sortBy.key] ?? 0;
		const vb = b[sortBy.key] ?? 0;

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

	const sorted = filteredByYear.sort((a, b) =>
		sortBy.dir === "DESC" ? -compare(a, b) : compare(a, b)
	);

	return sorted;
};

import type { Countries, TableRow } from "../source/types";

export const transformCountriesToTableRows = (countries: Countries): TableRow[] => {
	return Object.entries(countries).flatMap(([name, country]) =>
		country.data.map((record) => ({
			...record,
			iso_code: country.iso_code,
			name,
		}))
	);
};

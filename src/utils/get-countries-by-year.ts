import type { Countries, Emissions } from "../source/types";

export const getCountriesByYear = (
	data: Countries,
	year?: number
): Countries => {
	const entries = Object.entries(data).map(([name, country]) => {
		const selected: Emissions | undefined = year
			? country.data.find((d) => d.year === year)
			: country.data.at(-1);

		return [
			name,
			{
				...country,
				data: selected ? [selected] : [],
			},
		];
	});

	return Object.fromEntries(entries);
};


import type { Countries } from "../source/types";

export const getCountriesByYear = (
	data: Countries,
	year?: number
): Countries => {
	const filteredByYear = Object.entries(data).map(([key, value]) => {
		let yearSelected;

		if (year) {
			yearSelected = value.data.filter((item) => item.year === year);
		} else {
			yearSelected = value.data.at(-1) || {};
		}

		return [
			key,
			{
				...value,
				data: [yearSelected],
			},
		];
	});

	return Object.fromEntries(filteredByYear);
};

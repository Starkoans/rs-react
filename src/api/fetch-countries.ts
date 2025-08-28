import type { Countries } from "../source/types";

const fileUrl =
	"https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json";

export const fetchCountries = async (): Promise<Countries> => {
	const response = await fetch(fileUrl);
	return response.json();
};

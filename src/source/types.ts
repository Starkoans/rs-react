export type User = {
	name: string;
	age: number;
	email: string;
	password: string;
	confirmPassword: string;
	gender: "male" | "female";
	terms: boolean;
	country: string;
	picture: FileList;
};

export type Country = {
  name: string,
  capital: string,
  area: number,
  coordinates: number[],
  currencies: {
    name: string,
    symbol: string
  }[],
  languages: string[],
  maps: {
    googleMaps: string,
    openStreetMaps: string
  },
  postalCode: {
    format: string,
    regex: string
  },
  flags: {
    png: string,
    svg: string
  },
  population: number,
  emoji: string,
  countryCallingCode: string
}
export type User = {
	name: string;
	age: number;
	email: string;
	password: string;
	confirmPassword: string;
	gender: "male" | "female";
	terms: boolean;
	country: string;
	picture?: string;
};

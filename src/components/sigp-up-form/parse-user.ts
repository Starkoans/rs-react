import { schema } from "./validation";

export const parseUser = (fd: FormData) => {
	const age = fd.get("age");
	const pic = fd.get("picture");
	const gender = fd.get("gender");

	const raw = {
		name: String(fd.get("name") ?? ""),
		age: age === null || age === "" ? NaN : Number(age),
		email: String(fd.get("email") ?? ""),
		password: String(fd.get("password") ?? ""),
		confirmPassword: String(fd.get("confirmPassword") ?? ""),
		gender: gender === "male" || gender === "female" ? gender : undefined,
		terms: fd.get("terms") != null ? true : undefined,
		country: String(fd.get("country") ?? ""),
		picture: pic instanceof File && pic.size > 0 ? pic : undefined,
	};

	return schema.safeParse(raw);
};

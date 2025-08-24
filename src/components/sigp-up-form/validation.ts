import * as z from "zod";

const passwordSchema = z
	.string()
	.min(8, "The password should have minimum 8 characters")
	.regex(/[0-9]/, "The password must contain at least 1 digit")
	.regex(/[A-Z]/, "The password must contain at least one capital letter")
	.regex(/[a-z]/, "The password must contain at least one lowercase letter")
	.regex(
		/[^A-Za-z0-9]/,
		"The password must contain at least 1 special character"
	);

const ACCEPTED_TYPES = ["image/png", "image/jpeg"];
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB

const pictureSchema = z
	.instanceof(File, { message: "Загрузите изображение" })
	.refine((file) => ACCEPTED_TYPES.includes(file.type), {
		message: "Разрешены только PNG или JPEG",
	})
	.refine((file) => file.size <= MAX_FILE_SIZE, {
		message: "Размер файла должен быть ≤ 2 MB",
	});

export const schema = z
	.object({
		name: z
			.string()
			.min(1, "Name is required")
			.regex(/^[A-ZА-ЯЁ]/, "First letter in name should be uppercase"),
		age: z
			.number({ message: "Age should be number" })
			.min(0, "Age cannot be negative"),
		email: z.string().min(1, "Email is required").email("Invalid email"),
		password: passwordSchema,
		confirmPassword: z
			.string()
			.min(1, "The field “Confirm password” is required"),
		gender: z.enum(["male", "female"], {
			message: "Select gender",
		}),
		terms: z.boolean().refine((v) => v, { message: "Нужно согласие" }),
		country: z.string().min(1, "Select a country"),
		picture: pictureSchema,
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export type FormValues = z.infer<typeof schema>;

export const checkStrength = (pwd: string) => ({
	hasNumber: /[0-9]/.test(pwd),
	hasUpper: /[A-Z]/.test(pwd),
	hasLower: /[a-z]/.test(pwd),
	hasSpecial: /[^A-Za-z0-9]/.test(pwd),
	lengthOK: pwd.length >= 8,
});

import * as z from "zod";

const passwordSchema = z
	.string()
	.min(8, "Минимум 8 символов")
	.regex(/[0-9]/, "Нужна хотя бы 1 цифра")
	.regex(/[A-Z]/, "Нужна хотя бы 1 заглавная буква")
	.regex(/[a-z]/, "Нужна хотя бы 1 строчная буква")
	.regex(/[^A-Za-z0-9]/, "Нужен хотя бы 1 спецсимвол");

export const schema = z
	.object({
		name: z
			.string()
			.min(1, "Обязательно")
			.regex(/^[A-ZА-ЯЁ]/, "Первая буква должна быть заглавной"),
		age: z.number({ message: "Число" }).min(0, "Не может быть отрицательным"),
		email: z.string().min(1, "Обязательно").email("Некорректный email"),
		password: passwordSchema,
		confirmPassword: z.string().min(1, "Подтвердите пароль"),
		gender: z.enum(["male", "female" ], {
			message: "Выберите пол",
		}),
		terms: z.literal(true, {
			message: "Нужно принять условия",
		}),
		country: z.string().min(1, "Выберите страну"),
		picture: z
			.any()
			.refine((files) => files?.length === 1, "Загрузите файл")
			.refine(
				(files) => ["image/png", "image/jpeg"].includes(files?.[0]?.type),
				"Разрешены только PNG или JPEG"
			)
			.refine(
				(files) => (files?.[0]?.size ?? 0) <= 2 * 1024 * 1024,
				"Макс. размер 2MB"
			),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Пароли не совпадают",
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

import { FormProvider, useForm } from "react-hook-form";
import { checkStrength, schema, type FormValues } from "./validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput } from "../text-input/text-input";
import { countries } from "typed-countries";

export const SignUpFormControlled = () => {
	const methods = useForm<FormValues>({ resolver: zodResolver(schema) });
	const {
		handleSubmit,
		watch,
		formState: { isSubmitting },
	} = methods;

	const password = watch("password") || "";
	const strength = checkStrength(password);

	const onSubmit = async (data: FormValues) => {
		console.log(data);
	};

	const handlePictureChange = async (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = e.target.files?.[0];
		if (!file) return;
		if (!["image/png", "image/jpeg"].includes(file.type)) return;
		if (file.size > 2 * 1024 * 1024) return;
	};

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				style={{ maxWidth: 480, margin: "0 auto", display: "grid", gap: 12 }}
			>
				<TextInput name="name" placeholder="Your name" />
				<TextInput name="age" type="number" min={1} placeholder="Your age" />
				<TextInput name="email" type="email" placeholder="you@example.com" />
				<TextInput name="password" type="password" />
				<div>
					<ul>
						<li>{strength.lengthOK ? "✅" : "⚪"} ≥ 8 символов</li>
						<li>{strength.hasNumber ? "✅" : "⚪"} 1 цифра</li>
						<li>{strength.hasUpper ? "✅" : "⚪"} 1 заглавная</li>
						<li>{strength.hasLower ? "✅" : "⚪"} 1 строчная</li>
						<li>{strength.hasSpecial ? "✅" : "⚪"} 1 спецсимвол</li>
					</ul>
				</div>

				<TextInput
					name="confirmPassword"
					type="password"
					label="confirm password"
				/>

				<fieldset>
					<legend>Gender</legend>
					<TextInput name="gender" type="radio" label="male" value="male" />
					<TextInput name="gender" type="radio" label="female" value="female" />
				</fieldset>

				<TextInput
					name="terms"
					type="checkbox"
					label="Accept Terms and Conditions"
				/>
				<TextInput
					name="picture"
					type="file"
					onChange={handlePictureChange}
					accept="image/png,image/jpeg"
					label="Profile picture (PNG/JPEG, ≤2MB)"
				/>
				<TextInput
					name="country"
					list="countries"
					placeholder="Start typing…"
				/>
				<datalist id="countries">
					{countries.map(({name}, i) => (
						<option key={i} value={name} />
					))}
				</datalist>

				<button type="submit" disabled={isSubmitting}>
					Submit
				</button>
			</form>
		</FormProvider>
	);
};

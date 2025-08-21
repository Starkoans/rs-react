import { FormProvider, useForm } from "react-hook-form";
import { checkStrength, schema, type FormValues } from "./validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "../form-input/form-input";
import { countries } from "typed-countries";
import { useUserStore } from "../../store/store";
import type { FC } from "react";

interface Props {
	onSubmit: () => void;
}

export const SignUpFormControlled: FC<Props> = ({ onSubmit }) => {
	const setUser = useUserStore((state) => state.setUser);
	const user = useUserStore((state) => state.user);

	const methods = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues: {
			...user,
			terms: undefined,
		},
	});

	const {
		handleSubmit,
		watch,
		formState: { isSubmitting, isValid },
	} = methods;

	const password = watch("password") || "";
	const strength = checkStrength(password);

	const onFormSubmit = async (data: FormValues) => {
		onSubmit();
		setUser(data);
	};

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={handleSubmit(onFormSubmit)}
				style={{ maxWidth: 480, margin: "0 auto", display: "grid", gap: 12 }}
			>
				<FormInput name="name" placeholder="Your name" />
				<FormInput name="age" type="number" min={1} placeholder="Your age" />
				<FormInput name="email" type="email" placeholder="you@example.com" />

				<fieldset>
					<legend>Gender</legend>
					<FormInput
						name="gender"
						type="radio"
						label="male"
						value="male"
						id="gender-male"
					/>
					<FormInput
						name="gender"
						type="radio"
						label="female"
						value="female"
						id="gender-female"
					/>
				</fieldset>

				<FormInput name="password" type="password" />
				<div>
					<ul>
						<li>{strength.lengthOK ? "✅" : "⚪"} ≥ 8 символов</li>
						<li>{strength.hasNumber ? "✅" : "⚪"} 1 цифра</li>
						<li>{strength.hasUpper ? "✅" : "⚪"} 1 заглавная</li>
						<li>{strength.hasLower ? "✅" : "⚪"} 1 строчная</li>
						<li>{strength.hasSpecial ? "✅" : "⚪"} 1 спецсимвол</li>
					</ul>
				</div>

				<FormInput
					name="confirmPassword"
					type="password"
					label="confirm password"
				/>

				<FormInput
					name="picture"
					type="file"
					accept="image/png,image/jpeg"
					label="Profile picture (PNG/JPEG, ≤2MB)"
				/>
				<FormInput
					name="country"
					list="countries"
					placeholder="Start typing…"
				/>
				<datalist id="countries">
					{countries.map(({ name }, i) => (
						<option key={i} value={name} />
					))}
				</datalist>

				<FormInput
					name="terms"
					type="checkbox"
					label="Accept Terms and Conditions"
				/>

				<button type="submit" disabled={isSubmitting || !isValid}>
					Submit
				</button>
			</form>
		</FormProvider>
	);
};

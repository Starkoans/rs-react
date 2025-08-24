import { Controller, FormProvider, useForm } from "react-hook-form";
import { checkStrength, schema, type FormValues } from "./validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "../form-input/form-input";

import { type FC } from "react";
import { FormInputUncontrolled } from "../form-input/form-input-uncontrolled";
import { fileToBase64 } from "../../utils/file-to-base64";
import { useStore } from "../../store/store";

interface Props {
	onSubmit: () => void;
}

export const SignUpFormControlled: FC<Props> = ({ onSubmit }) => {
	const userControlled = useStore((store) => store.userControlled);
	const countries = useStore((store) => store.countries);
	const setUserControlled = useStore((store) => store.setUserControlled);
	const methods = useForm<FormValues>({
		resolver: zodResolver(schema),
		mode: "onChange",
		reValidateMode: "onChange",
		defaultValues: {
			...userControlled,
			picture: undefined,
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
		const newUser = { ...data, picture: await fileToBase64(data.picture) };
		setUserControlled(newUser);
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

				<Controller
					name="picture"
					render={({ field }) => (
						<FormInputUncontrolled
							name="picture"
							label="Profile picture (PNG/JPEG, ≤2MB)"
							type="file"
							accept="image/png,image/jpeg"
							onChange={(e) => field.onChange(e.currentTarget.files?.[0])}
						/>
					)}
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

import { useMemo, useState, type FC, type FormEventHandler } from "react";
import { FormInputUncontrolled } from "../form-input/form-input-uncontrolled";
import { useUserStore } from "../../store/store";
import { schema, type FormValues } from "./validation";
import countries from "typed-countries";

interface Props {
	onSubmit: () => void;
}

type Errors = Partial<Record<keyof FormValues, string>>;

export const SignUpFormUncontrolled: FC<Props> = ({ onSubmit }) => {
	const user = useUserStore((store) => store.user);
	const setUser = useUserStore((store) => store.setUser);
	const [errors, setErrors] = useState<Errors>({});

	const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		setErrors({});

		const fd = new FormData(e.currentTarget);
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
		} satisfies Partial<FormValues>;

		const parsed = schema.safeParse(raw);
		if (!parsed.success) {
			const next: Errors = {};

			for (const issue of parsed.error?.issues) {
				const key = issue.path[0] as keyof FormValues;
				if (!next[key]) next[key] = issue.message;
			}

			setErrors(next);
			return;
		}
		setUser(parsed.data);
		onSubmit();
	};

	const clearFieldError = (name: keyof FormValues) =>
		setErrors((prev) => {
			const { [name]: _, ...rest } = prev;
			return rest;
		});

	return (
		<form onSubmit={handleSubmit} noValidate>
			<FormInputUncontrolled
				name="name"
				defaultValue={user.name}
				error={errors.name}
				onChange={() => clearFieldError("name")}
				required
			/>
			<FormInputUncontrolled
				name="age"
				defaultValue={user.age}
				error={errors.age}
				onChange={() => clearFieldError("age")}
			/>
			<FormInputUncontrolled
				name="email"
				defaultValue={user.email}
				error={errors.email}
				onChange={() => clearFieldError("email")}
			/>
			<fieldset>
				<legend>Gender</legend>
				<FormInputUncontrolled
					name="gender"
					type="radio"
					label="male"
					value="male"
					defaultChecked={user.gender === "male"}
					error={errors.gender}
					onChange={() => clearFieldError("gender")}
					id="gender-male"
				/>
				<FormInputUncontrolled
					name="gender"
					type="radio"
					label="female"
					value="female"
					defaultChecked={user.gender === "female"}
					error={errors.gender}
					onChange={() => clearFieldError("gender")}
					id="gender-female"
				/>
			</fieldset>

			<FormInputUncontrolled
				name="country"
				list="countries"
				defaultValue={user.country}
				error={errors.country}
				onChange={() => clearFieldError("country")}
			/>
			<datalist id="countries">
				{countries.map(({ name }, i) => (
					<option key={i} value={name} />
				))}
			</datalist>

			<FormInputUncontrolled
				name="password"
				defaultValue={user.password}
				error={errors.password}
				onChange={() => clearFieldError("password")}
			/>
			<FormInputUncontrolled
				name="confirmPassword"
				defaultValue={user.confirmPassword}
				error={errors.confirmPassword}
				onChange={() => clearFieldError("confirmPassword")}
			/>

			<FormInputUncontrolled
				type="file"
				accept="image/png,image/jpeg"
				name="picture"
				error={errors.picture}
				onChange={(e) => {
					const pic = e.currentTarget.files?.[0];
					if (pic && pic.size > 0) clearFieldError("picture");
				}}
			/>
			<FormInputUncontrolled
				type="checkbox"
				name="terms"
				defaultChecked={false}
				error={errors.terms}
				onChange={() => clearFieldError("terms")}
			/>
			<button type="submit" disabled={Object.keys(errors).length > 0}>
				Submit
			</button>
		</form>
	);
};

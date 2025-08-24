
import { type FC, type FormEventHandler } from "react";
import { Input } from "../form-input/input";

import { useStore } from "../../store/store";
import { useUncontrolledForm } from "./use-uncontrolled-form";

interface Props {
	onSubmit: () => void;
}

export const SignUpFormUncontrolled: FC<Props> = ({ onSubmit }) => {
	const countries = useStore((store) => store.countries);
	const { user, handleSubmit, clearFieldError, errors } = useUncontrolledForm();

	const handleSubmitWrapper: FormEventHandler<HTMLFormElement> = (e) => {
		handleSubmit(e);
		onSubmit();
	};

	return (
		<form onSubmit={handleSubmitWrapper} noValidate>
			<Input
				name="name"
				defaultValue={user.name}
				error={errors.name}
				onChange={() => clearFieldError("name")}
				required
			/>
			<Input
				name="age"
				defaultValue={user.age}
				error={errors.age}
				onChange={() => clearFieldError("age")}
			/>
			<Input
				name="email"
				defaultValue={user.email}
				error={errors.email}
				onChange={() => clearFieldError("email")}
			/>
			<fieldset>
				<legend>Gender</legend>
				<Input
					name="gender"
					type="radio"
					label="male"
					value="male"
					defaultChecked={user.gender === "male"}
					error={errors.gender}
					onChange={() => clearFieldError("gender")}
					id="gender-male"
				/>
				<Input
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

			<Input
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

			<Input
				name="password"
				defaultValue={user.password}
				error={errors.password}
				onChange={() => clearFieldError("password")}
			/>
			<Input
				name="confirmPassword"
				defaultValue={user.confirmPassword}
				error={errors.confirmPassword}
				onChange={() => clearFieldError("confirmPassword")}
			/>

			<Input
				type="file"
				accept="image/png,image/jpeg"
				name="picture"
				error={errors.picture}
				onChange={(e) => {
					const pic = e.currentTarget.files?.[0];
					if (pic && pic.size > 0) clearFieldError("picture");
				}}
			/>
			<Input
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

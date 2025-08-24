import type { FC, InputHTMLAttributes } from "react";

import { useFormContext } from "react-hook-form";
import { InputUncontrolled } from "./input-uncontrolled";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	name: string;
	label?: string;
}

export const InputControlled: FC<Props> = ({
	name,
	label = name,
	type,
	onChange,
	...rest
}) => {
	const {
		register,
		formState: { errors },
	} = useFormContext();
	const err = errors[name]?.message?.toString();

	const regProps = {
		...register(name, {
			valueAsNumber: type === "number",
		}),
	};

	return (
		<InputUncontrolled
			label={label}
			error={err}
			{...regProps}
			{...rest}
			type={type}
		/>
	);
};

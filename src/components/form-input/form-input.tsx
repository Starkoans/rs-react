import type { FC, InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	name: string;
	label?: string;
}

export const FormInput: FC<Props> = ({ name, label = name, ...rest }) => {
	const {
		register,
		formState: { errors },
	} = useFormContext();
	const errMsg = errors[name]?.message;
	return (
		<>
			<label htmlFor={name}>
				{label}
				<input
					id={name}
					{...register(name, {
						valueAsNumber: rest.type === "number" ? true : false,
					})}
					{...rest}
				/>
			</label>
			{errMsg && <p style={{ color: "red" }}>{errMsg.toString()}</p>}
		</>
	);
};

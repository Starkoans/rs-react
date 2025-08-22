import type { FC, InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	error?: string;
	name: string;
	label?: string;
}

export const FormInputUncontrolled: FC<Props> = ({
	error,
	name,
	label = name,
	...rest
}) => {
	return (
		<>
			<label htmlFor={name}>
				{label}
				<input id={name} name={name} {...rest} />
			</label>
			{error && <p style={{ color: "red" }}>{error}</p>}
		</>
	);
};

import type { FC, InputHTMLAttributes } from "react";
import cx from "classnames";
import styles from "./form-input.module.css";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	error?: string;
	name: string;
	label?: string;
}

export const FormInputUncontrolled: FC<Props> = ({
	error,
	name,
	label = name,
	type,
	...rest
}) => {
	return (
		<div className={cx(styles.wrapperColumn, { [styles.wrapperRow]: type === "checkbox" || type === "radio" })}>
			<label htmlFor={name} className={cx(styles.label)}>{label}</label>
			<input
				id={name}
				name={name}
				type={type}
				{...rest}
				className={cx(styles.input, { [styles.error]: error })}
			/>
			<p className={cx(styles.errorMessage)}>{error}</p>
		</div>
	);
};

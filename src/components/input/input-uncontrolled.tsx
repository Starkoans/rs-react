import type { FC, InputHTMLAttributes } from "react";
import cx from "classnames";
import styles from "./input.module.css";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	error?: string;
	name?: string;
	label?: string;
}

export const InputUncontrolled: FC<Props> = ({
	error,
	name,
	label = name,
	type,
	id,
	...rest
}) => {
	const inputId = id ?? name;
	return (
		<div
			className={cx(styles.wrapperColumn, {
				[styles.wrapperRow]: type === "checkbox" || type === "radio",
			})}
		>
			<label htmlFor={inputId} className={cx(styles.label)}>
				{label}
			</label>
			<input
				name={name}
				type={type}
				{...rest}
				id={inputId}
				className={cx(styles.input, { [styles.error]: error })}
			/>
			<p className={cx(styles.errorMessage)}>{error}</p>
		</div>
	);
};

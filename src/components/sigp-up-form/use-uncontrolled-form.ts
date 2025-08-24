import { useState, type FormEventHandler } from "react";
import { useStore } from "../../store/store";
import { type FormValues } from "./validation";
import { fileToBase64 } from "../../utils/file-to-base64";
import { parseUser } from "./parse-user";

type Errors = Partial<Record<keyof FormValues, string>>;

export const useUncontrolledForm = () => {
	const user = useStore((store) => store.userUncontrolled);
	const setUser = useStore((store) => store.setUserUncontrolled);

	const [errors, setErrors] = useState<Errors>({});

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();
		setErrors({});

		const fd = new FormData(e.currentTarget);
		const parsed = parseUser(fd);

		if (!parsed.success) {
			const newErrors: Errors = {};
			for (const issue of parsed.error?.issues) {
				const key = issue.path[0] as keyof FormValues;
				if (!newErrors[key]) newErrors[key] = issue.message;
			}
			setErrors(newErrors);
			return;
		}

		const newUser = {
			...parsed.data,
			picture: await fileToBase64(parsed.data.picture),
		};
		setUser(newUser);
	};

	const clearFieldError = (name: keyof FormValues) =>
		setErrors((prev) => {
			const { [name]: _, ...rest } = prev;
			return rest;
		});

	return { user, handleSubmit, clearFieldError, errors };
};

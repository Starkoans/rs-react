// src/components/sign-up-form-uncontrolled.test.tsx
import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SignUpFormUncontrolled } from "./form-uncontrolled";
import type { User } from "../../source/types";

vi.mock("../../store/store", () => ({
	useStore: (selector: any) =>
		selector({
			countries: [
				{ name: "Kazakhstan" },
				{ name: "Austria" },
				{ name: "France" },
			],
		}),
}));

const handleSubmitMock = vi.fn();
const clearFieldErrorMock = vi.fn();

const baseUser: User = {
	name: "Olya",
	age: 49,
	email: "lookoye@example.com",
	country: "Kazakhstan",
	gender: "female",
	password: "Secret#123",
	terms: false,
	confirmPassword: "Secret#123",
	picture: "https://example.com/pic.png",
};

const baseHookReturn = {
	user: baseUser,
	handleSubmit: handleSubmitMock,
	clearFieldError: clearFieldErrorMock,
	errors: {},
	isValid: false,
};

vi.mock("./use-uncontrolled-form", () => ({
	useUncontrolledForm: vi.fn(() => baseHookReturn),
}));

vi.mock("../input/input-uncontrolled", () => ({
	InputUncontrolled: (props: any) => {
		const { name, label = name, error, type, ...rest } = props;
		return (
			<div>
				<label htmlFor={name}>{label}</label>
				<input
					id={name}
					name={name}
					type={type}
					aria-invalid={!!error}
					{...rest}
				/>
				{type === "file" ? null : (
					<span data-testid={`${name}-error`}>{error ?? ""}</span>
				)}
			</div>
		);
	},
}));

const useUncontrolledFormMock = vi.mocked(
	(await import("./use-uncontrolled-form")).useUncontrolledForm
);

beforeEach(() => {
	vi.clearAllMocks();
	useUncontrolledFormMock.mockReturnValue({ ...baseHookReturn });
});

describe("SignUpFormUncontrolled", () => {
	it("render all fields", () => {
		render(<SignUpFormUncontrolled onSubmit={vi.fn()} />);

		expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/age/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
		expect(screen.getByLabelText("Password")).toBeInTheDocument();
		expect(screen.getByLabelText("Confirm password")).toBeInTheDocument();

		const group = screen.getByRole("group", { name: /gender/i });

		expect(group).toBeInTheDocument();
		expect(screen.getByRole("checkbox", { name: "terms" })).toBeInTheDocument();
		expect(screen.getByLabelText(/picture/i)).toBeInTheDocument();

		const dataListEl = document.getElementById("countries");
		expect(dataListEl?.tagName.toLowerCase()).toBe("datalist");
		expect(
			dataListEl?.querySelectorAll("option").length
		).toBeGreaterThanOrEqual(3);
	});

	it("calls clearFieldError when typing in text field", async () => {
		const user = userEvent.setup();
		render(<SignUpFormUncontrolled onSubmit={vi.fn()} />);

		const nameInput = screen.getByLabelText("name") as HTMLInputElement;
		await user.clear(nameInput);
		await user.type(nameInput, "Olya Lookoye");

		expect(clearFieldErrorMock).toHaveBeenCalledWith("name");
	});

	it("calls clearFieldError when selecting a file", async () => {
		const user = userEvent.setup();
		render(<SignUpFormUncontrolled onSubmit={vi.fn()} />);

		const fileInput = screen.getByLabelText("picture") as HTMLInputElement;
		const file = new File(["hello"], "avatar.png", { type: "image/png" });

		await user.upload(fileInput, file);

		expect(clearFieldErrorMock).toHaveBeenCalledWith("picture");
	});

	it("disables submit button", async () => {
		const onSubmit = vi.fn();
		render(<SignUpFormUncontrolled onSubmit={onSubmit} />);

		const btn = screen.getByRole("button", { name: /submit/i });
		expect(btn).toBeDisabled();

		await userEvent.click(btn);
		expect(onSubmit).not.toHaveBeenCalled();
		expect(handleSubmitMock).not.toHaveBeenCalled();
	});

	it("calls handleSubmit and onSubmit when isValid is true", async () => {
		const onSubmit = vi.fn();

		useUncontrolledFormMock.mockReturnValue({
			...baseHookReturn,
			isValid: true,
		});

		render(<SignUpFormUncontrolled onSubmit={onSubmit} />);

		const btn = screen.getByRole("button", { name: /submit/i });
		expect(btn).toBeEnabled();

		await userEvent.click(btn);
		expect(handleSubmitMock).toHaveBeenCalledTimes(1);
		expect(onSubmit).toHaveBeenCalledTimes(1);
	});
});

import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SignUpFormControlled } from "./form-controlled";

vi.mock("../../source/validation", () => {
	return {
		checkStrength: () => ({
			hasNumber: true,
			hasUpper: true,
			hasLower: true,
			hasSpecial: true,
			lengthOK: true,
		}),
		schema: {
			parseAsync: vi.fn(async (data) => data),
		},
	};
});

const setUserControlledMock = vi.fn();
vi.mock("../../store/store", () => ({
	useStore: (selector: any) =>
		selector({
			userControlled: {
				name: "",
				age: undefined,
				email: "",
				country: "",
				gender: undefined,
				password: "",
				confirmPassword: "",
				terms: false,
				picture: undefined,
			},
			setUserControlled: setUserControlledMock,
			countries: [
				{ name: "Kazakhstan" },
				{ name: "Austria" },
				{ name: "France" },
			],
		}),
}));

const fileToBase64Mock = vi.fn(
	async (file: FormData) => "data:image/png;base64,AAA"
);
vi.mock("../../utils/file-to-base64", () => ({
	fileToBase64: (arg: FormData) => fileToBase64Mock(arg),
}));

vi.mock("./messages", () => ({
	messages: { labels: { gender: "Gender" } },
}));

vi.mock("../../source/validation", async () => {
	const { z } = await import("zod");
	return {
		checkStrength: () => ({
			hasNumber: true,
			hasUpper: true,
			hasLower: true,
			hasSpecial: true,
			lengthOK: true,
		}),
		schema: z.any(),
	};
});

beforeEach(() => {
	vi.clearAllMocks();
});

describe("SignUpFormControlled ", () => {
	it("Renders fields and submits with image conversion and storage in the store", async () => {
		const user = userEvent.setup();
		const onSubmit = vi.fn();

		render(<SignUpFormControlled onSubmit={onSubmit} />);

		expect(
			screen.getByRole("heading", { name: /controlled form/i })
		).toBeInTheDocument();
		const nameInput = screen.getByRole("textbox", { name: /name/i });
		const ageInput = screen.getByRole("spinbutton", { name: /age/i });
		const emailInput = screen.getByRole("textbox", { name: /email/i });
		const pwdInput = screen.getByLabelText(/^password$/i);
		const confirmInput = screen.getByLabelText(/confirm password/i);
		const terms = screen.getByRole("checkbox", {
			name: /accept terms and conditions/i,
		});
		const gender = screen.getByRole("radio", { name: /female/i });

		const fileInput = screen.getByLabelText(
			/profile picture/i
		) as HTMLInputElement;

		const countryInput = screen.getByLabelText(/country/i) as HTMLInputElement;

		await user.type(nameInput, "Alice");

		await user.clear(ageInput);
		await user.type(ageInput, "30");
		await user.type(emailInput, "alice@example.com");
		await user.type(pwdInput, "Secret#123");
		await user.type(confirmInput, "Secret#123");
		await user.type(countryInput, "Austria");
		await user.click(terms);
		await user.click(gender);

		const file = new File(["x"], "avatar.png", { type: "image/png" });
		await user.upload(fileInput, file);
		expect(fileInput.files?.[0]).toBe(file);

		const submitBtn = screen.getByRole("button", { name: /submit/i });
		expect(submitBtn).toBeEnabled();
		await user.click(submitBtn);

		expect(onSubmit).toHaveBeenCalledTimes(1);
		expect(fileToBase64Mock).toHaveBeenCalledTimes(1);
		expect(fileToBase64Mock).toHaveBeenCalledWith(file);

		expect(setUserControlledMock).toHaveBeenCalledTimes(1);
		const payload = setUserControlledMock.mock.calls[0][0];

		expect(payload).toMatchObject({
			name: "Alice",
			age: 30,
			email: "alice@example.com",
			gender: "female",
			country: "Austria",
			password: "Secret#123",
			confirmPassword: "Secret#123",
			terms: true,
			picture: "data:image/png;base64,AAA",
		});
	});
});

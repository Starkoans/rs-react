import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {InputUncontrolled} from './input-uncontrolled';

vi.mock("./input.module.css", () => ({
	default: {
		wrapperColumn: "wrapperColumn",
		wrapperRow: "wrapperRow",
		label: "label",
		input: "input",
		error: "error",
		errorMessage: "errorMessage",
	},
}));

describe("InputUncontrolled", () => {
	it("renders label and input; associates label with input", () => {
		render(<InputUncontrolled name="email" label="Email" type="email" />);
		const input = screen.getByLabelText(/email/i) as HTMLInputElement;

		expect(input).toBeInTheDocument();
		expect(input.id).toBe("email");
		expect(input.name).toBe("email");
	});

	it("applies wrapperRow for checkbox", () => {
		render(<InputUncontrolled name="agree" label="Agree" type="checkbox" />);
		const input = screen.getByLabelText(/agree/i);
		const container = input.closest("div");

		expect(container).toHaveClass("wrapperRow");
	});

	it("applies wrapperRow for radio", () => {
		render(<InputUncontrolled name="gender" label="Male" type="radio" />);
		const input = screen.getByLabelText(/male/i);
		const container = input.closest("div");

		expect(container).toHaveClass("wrapperRow");
	});

	it("defaults to wrapperColumn for text inputs", () => {
		render(<InputUncontrolled name="name" label="Name" type="text" />);
		const input = screen.getByLabelText(/name/i);
		const container = input.closest("div");

		expect(container).toHaveClass("wrapperColumn");
		expect(container).not.toHaveClass("wrapperRow");
	});

	it("shows error class on input and renders error message", () => {
		render(
			<InputUncontrolled
				name="email"
				label="Email"
				type="email"
				error="Invalid email"
			/>
		);

		const input = screen.getByLabelText(/email/i);
		expect(input).toHaveClass("input");
		expect(input).toHaveClass("error"); // класс ошибки примешивается

		// Рендерится текст ошибки
		expect(screen.getByText("Invalid email")).toBeInTheDocument();
	});

	it("passes through extra props and allows typing", async () => {
		const user = userEvent.setup();
		render(
			<InputUncontrolled
				name="name"
				label="Name"
				type="text"
				placeholder="Your name"
			/>
		);
		const input = screen.getByPlaceholderText("Your name") as HTMLInputElement;

		await user.type(input, "Olya");
		expect(input.value).toBe("Olya");
	});
});

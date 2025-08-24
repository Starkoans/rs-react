import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormProvider, useForm, type UseFormReturn } from "react-hook-form";
import type { PropsWithChildren } from "react";
import { InputControlled } from "./input-controlled";

vi.mock("./input.module.css", () => ({
	default: {
		wrapperColumn: "wrapperColumn",
		wrapperRow: "wrapperRow",
		label: "label",
		input: "input",
		error: "inputError",
		errorMessage: "errorMessage",
	},
}));

function renderWithRHF(
	ui: React.ReactElement,
	defaultValues?: Record<string, unknown>
) {
	let methods!: UseFormReturn<any>;

	const Wrapper = ({ children }: PropsWithChildren) => {
		methods = useForm({ defaultValues });
		return <FormProvider {...methods}>{children}</FormProvider>;
	};

	const utils = render(ui, { wrapper: Wrapper });
	return { ...utils, methods };
}

describe("InputControlled", () => {
	it("renders label & input and associates them", () => {
		renderWithRHF(<InputControlled name="email" label="Email" type="email" />);

		const input = screen.getByLabelText(/email/i);
		expect(input).toBeInTheDocument();
		expect(input).toHaveAttribute("id", "email");
		expect(input).toHaveAttribute("name", "email");
	});

	it("passes props and allows typing; RHF stores value", async () => {
		const user = userEvent.setup();
		const { methods } = renderWithRHF(
			<InputControlled
				name="email"
				label="Email"
				type="email"
				placeholder="you@example.com"
			/>
		);

		const input = screen.getByPlaceholderText(
			"you@example.com"
		) as HTMLInputElement;
		await user.type(input, "test@example.com");
		expect(input.value).toBe("test@example.com");
		expect(methods.getValues("email")).toBe("test@example.com");
	});

	it('uses valueAsNumber for type="number"', async () => {
		const user = userEvent.setup();
		const { methods } = renderWithRHF(
			<InputControlled name="age" label="Age" type="number" />
		);
		const input = screen.getByLabelText(/age/i) as HTMLInputElement;

		await user.type(input, "42");
		expect(methods.getValues("age")).toBe(42);
		expect(typeof methods.getValues("age")).toBe("number");
		expect(input.value).toBe("42");
	});

	it("shows error from formState.errors", async () => {
		const { methods } = renderWithRHF(
			<InputControlled name="email" label="Email" type="email" />
		);

		methods.setError("email", { type: "manual", message: "Invalid email" });

		await waitFor(() => {
			expect(screen.getByText("Invalid email")).toBeInTheDocument();
		});

		const input = screen.getByLabelText(/email/i);
		expect(input).toHaveClass("input");
		expect(input).toHaveClass("inputError");
	});
});

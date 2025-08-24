import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { useUncontrolledForm } from "./use-uncontrolled-form";

const setUserUncontrolledMock = vi.fn();

const baseUser = {
	name: "Olya",
	age: 49,
	email: "lookoye@example.com",
	country: "Kazakhstan",
	gender: "female",
	password: "Secret#123",
	confirmPassword: "Secret#123",
	terms: false,
	picture: "https://example.com/old.png",
};

vi.mock("../../store/store", () => ({
	useStore: (selector: any) =>
		selector({
			userUncontrolled: baseUser,
			setUserUncontrolled: setUserUncontrolledMock,
		}),
}));

const parseUserMock = vi.fn();
vi.mock("./parse-user", () => ({
	parseUser: (...args: any[]) => parseUserMock(...args),
}));

const fileToBase64Mock = vi.fn();
vi.mock("../../utils/file-to-base64", () => ({
	fileToBase64: (...args: any[]) => fileToBase64Mock(...args),
}));

function HookProbe() {
	const h = useUncontrolledForm();
	return (
		<form onSubmit={h.handleSubmit} data-testid="form" noValidate>
			<div data-testid="isValid">{String(h.isValid)}</div>
			<div data-testid="errors">{JSON.stringify(h.errors)}</div>

			<input name="dummy" defaultValue="x" />
			<button type="button" onClick={() => h.clearFieldError("email")}>
				clear-email
			</button>
			<button type="submit">submit</button>
		</form>
	);
}

beforeEach(() => {
	vi.clearAllMocks();
	parseUserMock.mockReset();
	fileToBase64Mock.mockReset();
});

describe("useUncontrolledForm", () => {
	it("returns the user from the store and marks the form as valid when there are no errors", async () => {
		render(<HookProbe />);

		await waitFor(() => {
			expect(screen.getByTestId("isValid")).toHaveTextContent("true");
		});
		expect(screen.getByTestId("errors")).toHaveTextContent("{}");
	});

	it("When submitting with errors, it puts dedupe errors in state and isValid=false", async () => {
		parseUserMock.mockReturnValueOnce({
			success: false,
			error: {
				issues: [
					{ path: ["email"], message: "Invalid email" },
					{ path: ["email"], message: "Should be company mail" },
					{ path: ["name"], message: "Name is required" },
				],
			},
		});

		render(<HookProbe />);

		fireEvent.submit(screen.getByTestId("form"));

		await waitFor(() => {
			expect(screen.getByTestId("isValid")).toHaveTextContent("false");
			const errs = JSON.parse(screen.getByTestId("errors").textContent || "{}");
			expect(errs).toEqual({
				email: "Invalid email",
				name: "Name is required",
			});
		});

		expect(setUserUncontrolledMock).not.toHaveBeenCalled();
		expect(fileToBase64Mock).not.toHaveBeenCalled();
	});

	it("clearFieldError removes a specific error and can make the form valid", async () => {
		parseUserMock.mockReturnValueOnce({
			success: false,
			error: {
				issues: [{ path: ["email"], message: "Invalid email" }],
			},
		});

		render(<HookProbe />);
		fireEvent.submit(screen.getByTestId("form"));

		await waitFor(() => {
			expect(screen.getByTestId("isValid")).toHaveTextContent("false");
		});

		await userEvent.click(screen.getByRole("button", { name: /clear-email/i }));

		await waitFor(() => {
			expect(screen.getByTestId("errors")).toHaveTextContent("{}");
			expect(screen.getByTestId("isValid")).toHaveTextContent("true");
		});
	});

	it("Upon successful submission, converts the image to base64 and calls setUser.", () => {
		const parsedData = {
			...baseUser,
			picture: {} as any,
		};

		parseUserMock.mockReturnValueOnce({
			success: true,
			data: parsedData,
		});

		fileToBase64Mock.mockResolvedValueOnce("data:image/png;base64,Zm9v");

		render(<HookProbe />);
		fireEvent.submit(screen.getByTestId("form"));

		waitFor(() => {
			expect(fileToBase64Mock).toHaveBeenCalledTimes(1);
			expect(fileToBase64Mock).toHaveBeenCalledWith(parsedData.picture);
			expect(setUserUncontrolledMock).toHaveBeenCalledTimes(1);
			expect(setUserUncontrolledMock).toHaveBeenCalledWith({
				...parsedData,
				picture: "data:image/png;base64,Zm9v",
			});
			expect(screen.getByTestId("errors")).toHaveTextContent("{}");
			expect(screen.getByTestId("isValid")).toHaveTextContent("true");
		});
	});
});

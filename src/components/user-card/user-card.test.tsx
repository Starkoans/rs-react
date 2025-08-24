import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { UserCard } from "./user-card";
import type { User } from "../../source/types";

vi.mock("./user-card.module.css", () => ({
	default: {
		card: "card",
		updated: "updated",
		avatarContainer: "avatarContainer",
		avatar: "avatar",
	},
}));

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

describe("UserCard", () => {
	it("renders all fields and avatar when picture provided", () => {
		render(<UserCard user={baseUser} />);

		expect(screen.getByText(/Name:/)).toHaveTextContent("Name: Olya");
		expect(screen.getByText(/Age:/)).toHaveTextContent("Age: 49");
		expect(screen.getByText(/Email:/)).toHaveTextContent(
			"Email: lookoye@example.com"
		);
		expect(screen.getByText(/Country:/)).toHaveTextContent(
			"Country: Kazakhstan"
		);
		expect(screen.getByText(/Gender:/)).toHaveTextContent("Gender: female");
		expect(screen.getByText(/Password:/)).toHaveTextContent(
			"Password: Secret#123"
		);
		expect(screen.getByText(/Terms accepted:/)).toHaveTextContent(
			"Terms accepted: ❌"
		);

		const img = screen.getByAltText("User Picture") as HTMLImageElement;
		expect(img).toBeInTheDocument();
		expect(img).toHaveClass("avatar");
		expect(img.src).toBe(baseUser.picture);
	});

	it("does not render avatar img when picture is missing", () => {
		const userNoPic = { ...baseUser, picture: undefined };
		render(<UserCard user={userNoPic} />);

		expect(screen.queryByAltText("User Picture")).not.toBeInTheDocument();
	});

	it('does not have "updated" class on first render', () => {
		const { container } = render(<UserCard user={baseUser} />);
		const card = container.querySelector(".card")!;
		expect(card).toBeInTheDocument();
		expect(card).not.toHaveClass("updated");
	});

	it('adds "updated" class on user change and removes after 1s', () => {
		vi.useFakeTimers();

		const { rerender, container } = render(<UserCard user={baseUser} />);
		const card = container.querySelector(".card")!;

		const changed = { ...baseUser, name: "Olya Lookoye" };
		rerender(<UserCard user={changed} />);

		expect(card).toHaveClass("updated");

		act(() => {
			vi.advanceTimersByTime(1000);
		});
		expect(card).not.toHaveClass("updated");

		vi.useRealTimers();
	});
});

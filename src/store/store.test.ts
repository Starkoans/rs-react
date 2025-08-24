import { describe, it, expect, vi, beforeAll, beforeEach } from "vitest";

vi.mock("typed-countries", () => {
	return {
		countries: [
			{ name: "Kazakhstan" },
			{ name: "Austria" },
			{ name: "France" },
		],
	};
});
import { countries as mockedCountries } from "typed-countries";
import { useStore } from "./store";

let snapshot: ReturnType<typeof useStore.getState>;

beforeAll(() => {
	snapshot = useStore.getState();
});

beforeEach(() => {
	useStore.setState(snapshot, true);
});

let initialSnapshot: ReturnType<typeof useStore.getState>;

beforeAll(() => {
	initialSnapshot = useStore.getState();
});

beforeEach(() => {
	useStore.setState(initialSnapshot, true);
});

describe("useStore (Zustand)", () => {
	it("initialized with wet countries and default users", () => {
		const state = useStore.getState();

		expect(useStore.getState().countries).toEqual(mockedCountries);
		expect(Array.isArray(state.countries)).toBe(true);

		expect(useStore.getState().userControlled).toEqual({ name: "John" });
		expect(useStore.getState().userUncontrolled).toEqual({ name: "John" });
	});

	it("setUserControlled merges fields without overwriting existing ones", () => {
		const { getState } = useStore;

		getState().setUserControlled({ email: "c@example.com" });
		expect(getState().userControlled).toEqual({
			name: "John",
			email: "c@example.com",
		});

		getState().setUserControlled({ age: 30 });
		expect(getState().userControlled).toEqual({
			name: "John",
			email: "c@example.com",
			age: 30,
		});

		getState().setUserControlled({ name: "Mary" });
		expect(getState().userControlled).toEqual({
			name: "Mary",
			email: "c@example.com",
			age: 30,
		});
	});

	it("setUserUncontrolled merges fields without affecting controlled", () => {
		const { getState } = useStore;

		getState().setUserControlled({ email: "c@example.com" });
		getState().setUserUncontrolled({ email: "u@example.com", age: 28 });

		expect(getState().userUncontrolled).toEqual({
			name: "John",
			email: "u@example.com",
			age: 28,
		});

		expect(getState().userControlled).toEqual({
			name: "John",
			email: "c@example.com",
		});
	});

	it("updates controlled and uncontrolled independently", () => {
		const { getState } = useStore;

		getState().setUserControlled({ email: "c@example.com" });
		getState().setUserUncontrolled({ email: "u@example.com" });

		expect(getState().userControlled).toEqual({
			name: "John",
			email: "c@example.com",
		});
		expect(getState().userUncontrolled).toEqual({
			name: "John",
			email: "u@example.com",
		});
	});
});

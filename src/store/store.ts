import { create } from "zustand";
import { createSelectors } from "./create-selectors";
import { defaultHeaders } from "../source/default-headers";
import type { columnKey, Filters } from "../source/types";

export interface TableState {
	tableHeaders: columnKey[];
	filters: Filters;
	toggleColumn: (col: columnKey) => void;
	setFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
	toggleSort: (key: columnKey) => void;
}

const useStoreBase = create<TableState>()((set) => ({
	tableHeaders: defaultHeaders,
	filters: {},
	toggleColumn: (col) => {
		set((state) =>
			state.tableHeaders.includes(col)
				? { tableHeaders: state.tableHeaders.filter((c) => c !== col) }
				: { tableHeaders: [...state.tableHeaders, col] }
		);
	},

	setFilter: (key, value) =>
		set((s) => ({ filters: { ...s.filters, [key]: value } })),

	toggleSort: (key) =>
		set((s) => {
			const current = s.filters.sortBy;
			if (!current || current.key !== key) {
				return { filters: { ...s.filters, sortBy: { key, dir: "ASC" } } };
			}
			if (current.dir === "ASC") {
				return { filters: { ...s.filters, sortBy: { key, dir: "DESC" } } };
			}
			return { filters: { ...s.filters, sortBy: undefined } };
		}),
}));

export const useStore = createSelectors(useStoreBase);

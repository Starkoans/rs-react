import { create } from "zustand";
import { createSelectors } from "./create-selectors";
import { defaultHeaders } from "../source/default-headers";
import type { columnKey, Filters } from "../source/types";

export interface TableState {
	tableHeaders: columnKey[];
	filters: Filters;
	toggleColumn: (col: columnKey) => void;
	setCountryNameFilter: (val?: string) => void;
	setYearFilter: (val?: string | number) => void;
	toggleSort: (key: columnKey) => void;
	resetFIlters: () => void;
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

	setCountryNameFilter: (value) =>
		set((s) => ({ filters: { ...s.filters, countryName: value } })),
	setYearFilter: (value) =>
		set((s) => ({
			filters: { ...s.filters, year: value ? Number(value) : undefined },
		})),

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

	resetFIlters: () => set(() => ({ filters: {} })),
}));

export const useStore = createSelectors(useStoreBase);

import { create } from "zustand";
import { createSelectors } from "./create-selectors";
import { defaultHeaders } from "../source/default-headers";
import type { columnKey, Filters } from "../source/types";

export interface TableState {
	tableHeaders: columnKey[];
	filters: Filters;
	toggleColumn: (col: columnKey) => void;
	setFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
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
}));

export const useStore = createSelectors(useStoreBase);

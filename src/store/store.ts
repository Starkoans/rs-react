import { create } from "zustand";
import { headers, type columnKey, type TableRow } from "../source/headers";
import { createSelectors } from "./create-selectors";
import { defaultHeaders } from "../source/default-headers";

export interface TableState {
	tableHeaders: Partial<TableRow>;
	removeColumn: (col: columnKey) => void;
	addColumn: (col: columnKey) => void;
}

const useStoreBase = create<TableState>()((set) => ({
	tableHeaders: defaultHeaders,
	removeColumn: (col) => {
		set((prev) => {
			const { [col]: _, ...rest } = prev.tableHeaders;
			return { tableHeaders: rest };
		});
	},
	addColumn: (col) =>
		set((prev) => ({
			tableHeaders: { ...prev.tableHeaders, [col]: headers[col] },
		})),
}));

export const useStore = createSelectors(useStoreBase);

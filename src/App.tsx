import { Table } from "./components/table/table";
import { Suspense } from "react";
import { TableSkeleton } from "./components/table/table-skeleton";
import { Header } from "./components/header/header";

function App() {
	return (
		<>
			<Header />
			<Suspense fallback={<TableSkeleton />}>
				<Table />
			</Suspense>
		</>
	);
}

export default App;

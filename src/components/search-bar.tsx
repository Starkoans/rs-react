import {
	useState,
	type ChangeEventHandler,
	type FC,
	type FormEventHandler,
} from "react";
import { useStore } from "../store/store";

export const SearchBar: FC = () => {
	const filters = useStore.use.filters();
	const setFilter = useStore.use.setFilter();

	const [year, setYear] = useState(filters.year);

	const onChange: ChangeEventHandler<HTMLInputElement> = (e) =>
		setYear(Number(e.target.value));

	const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		setFilter("year", year);
	};

	const onReset = () => {
		setFilter("year", undefined);
	};

	return (
		<form onSubmit={onSubmit}>
			<input onChange={onChange} placeholder="2020"></input>
			<button type="submit">Search</button>
			<button onClick={onReset}>Reset</button>
		</form>
	);
};

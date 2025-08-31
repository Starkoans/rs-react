import {
	useState,
	type ChangeEventHandler,
	type FC,
	type FormEventHandler,
} from "react";
import { useStore } from "../../store/store";
import styles from "./search.bar.module.css";

export const SearchBar: FC = () => {
	const filters = useStore.use.filters();
	const setCountryNameFilter = useStore.use.setCountryNameFilter();
	const setYearFilter = useStore.use.setYearFilter();
	const resetFilters = useStore.use.resetFIlters();

	const [year, setYear] = useState(filters.year?.toString());
	const [country, setCountry] = useState(filters.countryName);

	const onYearChange: ChangeEventHandler<HTMLInputElement> = (e) =>
		setYear(e.target.value);

	const onCountryChange: ChangeEventHandler<HTMLInputElement> = (e) =>
		setCountry(e.target.value);

	const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		setYearFilter(year);
		setCountryNameFilter(country);
	};

	const onReset = () => {
		setYear("");
		setCountry("");
		resetFilters();
	};

	return (
		<form onSubmit={onSubmit}>
			<label>
				Country
				<input
					onChange={onCountryChange}
					value={country}
					placeholder="Country"
					name="country"
					className={styles.input}
				/>
			</label>
			<label>
				Year
				<input
					onChange={onYearChange}
					value={year}
					placeholder="2020"
					name="year"
					className={styles.input}
				/>
			</label>
			<button type="submit">Search</button>
			<button onClick={onReset}>Reset</button>
		</form>
	);
};

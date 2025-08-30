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
	const setFilter = useStore.use.setFilter();

	const [year, setYear] = useState(filters.year);
	const [country, setCountry] = useState(filters.countryName);

	const onYearChange: ChangeEventHandler<HTMLInputElement> = (e) =>
		setYear(Number(e.target.value));

	const onCountryChange: ChangeEventHandler<HTMLInputElement> = (e) =>
		setCountry(e.target.value);

	const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		setFilter("year", year);
		setFilter("countryName", country);
	};

	const onReset = () => {
		setYear(2023);
		setCountry("");
		setFilter("year", 2023);
		setFilter("countryName", undefined);
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

import { ColumnsSelect } from "../headers-selector";
import { SearchBar } from "../search-bar/search-bar";
import styles from "./header.module.css";

export const Header = () => {
	return (
		<div className={styles.header}>
			<SearchBar />
			<ColumnsSelect />
		</div>
	);
};

import { useEffect, useState } from "react";
import { useUserStore } from "../store/store";
import styles from "./user-card.module.css";

export const UserCard = () => {
	const [isUpdated, setIsUpdated] = useState(false);
	const user = useUserStore((state) => state.user);

	useEffect(() => {
		setIsUpdated(true);

		setTimeout(() => {
			setIsUpdated(false);
		}, 1000);
	}, [user]);

	return (
		<div className={isUpdated ? styles.updated : ""}>
			<p>Name: {user.name}</p>
			<p>Age: {user.age}</p>
			<p>Email: {user.email}</p>
			<p>Country: {user.country}</p>
			<p>Gender: {user.gender}</p>
			<p>Password: {user.password}</p>
			<p>Picture: {user.picture?.toString()}</p>
			<p>Terms accepted: {user.terms}</p>
		</div>
	);
};

import { useEffect, useState, type FC } from "react";
import styles from "./user-card.module.css";
import type { User } from "../../source/types";
import cx from "classnames";

interface Props {
	user: Partial<User>;
}

export const UserCard: FC<Props> = ({ user }) => {
	const [isUpdated, setIsUpdated] = useState(false);
	const [isFirstRender, setIsFirstRender] = useState(true);

	useEffect(() => {
		if (isFirstRender) {
			setIsFirstRender(false);
			return;
		}

		setIsUpdated(true);

		setTimeout(() => {
			setIsUpdated(false);
		}, 1000);
	}, [user]);

	return (
		<div className={cx(styles.card, { [styles.updated]: isUpdated })}>
			<div className={styles.avatarContainer}>
				{user.picture && (
					<img
						className={cx(styles.avatar)}
						src={user.picture}
						alt="User Picture"
					/>
				)}
			</div>
			<p>Name: {user.name}</p>
			<p>Age: {user.age}</p>
			<p>Email: {user.email}</p>
			<p>Country: {user.country}</p>
			<p>Gender: {user.gender}</p>
			<p>Password: {user.password}</p>
			<p>Terms accepted: {user.terms ? "Yes" : "No"}</p>
		</div>
	);
};

import { Modal } from "./components/modal/modal";

import { useState } from "react";
import { SignUpFormControlled } from "./components/form-controlled/form-controlled";
import { UserCard } from "./components/user-card/user-card";
import { SignUpFormUncontrolled } from "./components/form-uncontrolled/form-uncontrolled";
import { useStore } from "./store/store";
import styles from "./App.module.css";

function App() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isControlledForm, setIsControlledForm] = useState(false);
	const userControlled = useStore((store) => store.userControlled);
	const userUncontrolled = useStore((store) => store.userUncontrolled);

	const onControlled = () => {
		setIsControlledForm(true);
		setIsModalOpen(true);
	};

	const onUncontrolled = () => {
		setIsControlledForm(false);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<div className={styles.buttons}>
				<button onClick={onUncontrolled} className={styles.uncontrolled}>
					Open uncontrolled form
				</button>
				<button onClick={onControlled} className={styles.controlled}>
					Open controlled form
				</button>
			</div>

			<div className={styles.userCards}>
				<div className={styles.userCard}>
					<h2 className={styles.uncontrolled}>Uncontrolled</h2>
					<UserCard user={userUncontrolled} />
				</div>
				<div className={styles.userCard}>
					<h2 className={styles.controlled}>Controlled</h2>
					<UserCard user={userControlled} />
				</div>
			</div>

			<Modal open={isModalOpen} onClose={closeModal}>
				{isControlledForm && <SignUpFormControlled onSubmit={closeModal} />}
				{!isControlledForm && <SignUpFormUncontrolled onSubmit={closeModal} />}
			</Modal>
		</>
	);
}

export default App;

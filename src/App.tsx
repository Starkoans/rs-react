import { Modal } from "./components/modal/modal";
import { useState } from "react";
import { SignUpFormControlled } from "./components/sigp-up-form/sign-up-form-controlled";
import { UserCard } from "./components/user-card/user-card";
import { SignUpFormUncontrolled } from "./components/sigp-up-form/sign-up-form-uncontrolled";
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

	return (
		<>
			<button onClick={onControlled}>Open controlled form</button>
			<button onClick={onUncontrolled}>Open uncontrolled form</button>
			<div className={styles.userCards}>
				<div>
					<h2>Uncontrolled</h2> <UserCard user={userUncontrolled} />
				</div>
				<div>
					<h2>Controlled</h2> <UserCard user={userControlled} />
				</div>
			</div>

			<Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
				{isControlledForm && (
					<SignUpFormControlled
						onSubmit={() => {
							setIsModalOpen(false);
						}}
					/>
				)}
				{!isControlledForm && (
					<SignUpFormUncontrolled
						onSubmit={() => {
							setIsModalOpen(false);
						}}
					/>
				)}
			</Modal>
		</>
	);
}

export default App;

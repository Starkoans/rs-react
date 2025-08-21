import "./App.css";
import { Modal } from "./components/modal/modal";
import { useState } from "react";
import { SignUpFormControlled } from "./components/sigp-up-form/sign-up-form-controlled";
import { UserCard } from "./user-card/user-card";

function App() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isControlledForm, setIsControlledForm] = useState(false);

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
			<UserCard />
			<Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
				{isControlledForm && (
					<SignUpFormControlled
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

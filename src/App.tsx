import "./App.css";
import { Modal } from "./components/modal";
import { useState } from "react";

function App() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const onControlled = () => {
		setIsModalOpen(true);
	};

	const onUncontrolled = () => {
		setIsModalOpen(true);
	};
	return (
		<>
			<button onClick={onControlled}>Open controlled form</button>
			<button onClick={onUncontrolled}>Open uncontrolled form</button>
			<Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
		</>
	);
}

export default App;

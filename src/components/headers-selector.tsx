import { useState, type ChangeEventHandler } from "react";
import { headers, type columnKey } from "../source/headers";
import { useStore } from "../store/store";
import { Modal } from "./modal/modal";

export const HeadersSelector = () => {
	const selectedHeaders = useStore.use.tableHeaders();
	const removeHeader = useStore.use.removeColumn();
	const addHeader = useStore.use.addColumn();

	const [isOpenModal, setIsOpenModal] = useState(false);
	const openModal = () => {
		setIsOpenModal(true);
	};

	const closeModal = () => {
		setIsOpenModal(false);
	};

	const onToggleHeader: ChangeEventHandler<HTMLInputElement> = (e) => {
		const key = e.target.id as columnKey;

		if (selectedHeaders[key]) {
			removeHeader(key);
			return;
		}
		addHeader(key);
	};
	return (
		<>
			<button onClick={openModal}>Custom columns</button>
			<Modal open={isOpenModal} onClose={closeModal}>
				{Object.entries(headers).map(([key, value]) => {
					const headerKey = key as columnKey;
					return (
						<label key={key}>
							<input
								type="checkbox"
								id={key}
								checked={!!selectedHeaders[headerKey]}
								onChange={onToggleHeader}
							/>
							{value}
						</label>
					);
				})}
			</Modal>
		</>
	);
};

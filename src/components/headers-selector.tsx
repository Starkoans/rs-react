import { useCallback, useState, type ChangeEventHandler } from "react";
import { headers } from "../source/headers";
import { useStore } from "../store/store";
import { Modal } from "./modal/modal";
import type { columnKey } from "../source/types";

export const ColumnsSelect = () => {
	const columns = useStore.use.tableHeaders();
	const toggleColumn = useStore.use.toggleColumn();

	const [isOpenModal, setIsOpenModal] = useState(false);

	const openModal = () => setIsOpenModal(true);
	const closeModal = () => setIsOpenModal(false);

	const onToggleHeader = useCallback<ChangeEventHandler<HTMLInputElement>>(
		(e) => {
			const key = e.target.id as columnKey;
			toggleColumn(key);
		},
		[toggleColumn]
	);

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
								checked={columns.includes(headerKey)}
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

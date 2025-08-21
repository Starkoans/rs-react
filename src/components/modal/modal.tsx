import { useEffect, useRef, type FC, type ReactNode } from "react";
import { createPortal } from "react-dom";
import styles from "./modal.module.css";
import { HiMiniXMark } from "react-icons/hi2";

interface Props {
	children?: ReactNode;
	open?: boolean;
	onClose?: () => void;
}

export const Modal: FC<Props> = ({ onClose, open, children }) => {
	const ref = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const dialog = ref.current;
		if (!dialog) return;

		if (open) {
			if (!dialog.open) {
				dialog.showModal();
			}
		} else {
			if (dialog.open) {
				dialog.close();
			}
		}
	}, [open]);

	const handleOutsideClick = (e: React.MouseEvent<HTMLDialogElement>) => {
		const dialog = ref.current;
		if (!dialog) return;

		const rect = dialog.getBoundingClientRect();
		const isInDialog =
			e.clientX >= rect.left &&
			e.clientX <= rect.right &&
			e.clientY >= rect.top &&
			e.clientY <= rect.bottom;

		if (!isInDialog) {
			onClose?.();
		}
	};

	if (!open) return null;
	return createPortal(
		<dialog ref={ref} onClose={onClose} onClick={handleOutsideClick}>
			<div>
				{children}
				<button onClick={onClose} className={styles.closeBtn}>
					<HiMiniXMark  size={"30px"}/>
				</button>
			</div>
		</dialog>,
		document.body
	);
};

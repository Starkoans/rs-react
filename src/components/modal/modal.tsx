import { useRef, type FC, type ReactNode } from "react";
import { createPortal } from "react-dom";
import styles from "./modal.module.css";
import { HiMiniXMark } from "react-icons/hi2";
import cx from "classnames";

interface Props {
	children?: ReactNode;
	open?: boolean;
	onClose?: () => void;
}

export const Modal: FC<Props> = ({ onClose, open, children }) => {
	const ref = useRef<HTMLDialogElement>(null);

	const handleOutsideClick = () => {
		onClose?.();
	};

	if (!open) return null;
	return createPortal(
		<div className={cx(styles.overlay)} onClick={handleOutsideClick}>
			<dialog
				ref={ref}
				className={cx(styles.dialog)}
				onClose={onClose}
				onClick={handleOutsideClick}
				open={open}
			>
				<div>
					{children}
					<button onClick={onClose} className={styles.closeBtn}>
						<HiMiniXMark size={"30px"} />
					</button>
				</div>
			</dialog>
		</div>,
		document.body
	);
};

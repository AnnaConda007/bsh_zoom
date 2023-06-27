import { Modal, Box, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import 'dayjs/locale/ru';
import ToDoBox from '../toDoBox.component/toDoBox.component';
import styles from './modalBox.module.scss'; 
const ModalBox = ({ setModal, modal }) => {
	const handleClose = () => {
		setModal(false);
	};

	return (
		<>
			<Modal
				onClose={handleClose}
				className={styles.modal}
				open={modal}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box className={styles.box}>
					<div className={styles.btn_wrap}>
						<Button onClick={handleClose}>
							<CloseIcon className={styles.btn} />
						</Button>
					</div>
					<div className={styles.ToDoBox}>
						<ToDoBox />
					</div>
				</Box>
			</Modal>
		</>
	);
};

export default ModalBox;

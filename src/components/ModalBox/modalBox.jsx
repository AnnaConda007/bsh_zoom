import { useEffect, useState } from 'react';
import { Modal, Box, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import 'dayjs/locale/ru';
import ToDoBox from '../toDoBox.component/toDoBox.component';

const ModalBox = ({ activeDate, setModal, modal, dates, setDates }) => {
	const handleClose = () => {
		setModal(false);
	};

	return (
		<>
			<Modal
				onClose={handleClose}
				className='modal'
				open={modal}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box className='modal__box'>
					<div className='modal__btn-wrap'>
						<Button onClick={handleClose}>
							<CloseIcon className='modal__btn' />
						</Button>
					</div>
					<div className='modal__ToDoBox-wrap'>
						<ToDoBox activeDate={activeDate} dates={dates} setDates={setDates} />
					</div>
				</Box>
			</Modal>
		</>
	);
};

export default ModalBox;

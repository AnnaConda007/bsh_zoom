import { TextField, FormControl } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
const ToDoBox = () => {
	return (
		<>
			<div className='to-do-wrap'>
				<div className='to-do-wrap__add'>
					<TextField
						InputProps={{
							endAdornment: <AddCircleOutlineIcon />,
						}}
					/>
				</div>
				<div className='to-do-wrap__tasks'>
					<FormControl>
						<TextField
							InputProps={{
								endAdornment: (
									<div>
										<DeleteForeverIcon />
										<ModeEditIcon />
									</div>
								),
							}}
						/>
					</FormControl>
				</div>
			</div>
		</>
	);
};

export default ToDoBox;

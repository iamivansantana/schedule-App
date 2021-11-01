import React from 'react';
import { useDispatch } from 'react-redux';
import { eventCleanActive } from '../../actions/eventsActions';
import { uiOpenModal } from '../../actions/uiActions';

const AddNewFab = () => {
	const dispatch = useDispatch();

	const handleClicNew = () => {
		dispatch(uiOpenModal());
		dispatch(eventCleanActive());
	};
	return (
		<>
			<button className='btn btn-primary fab' onClick={handleClicNew}>
				<i className='fas fa-plus'></i>
			</button>
		</>
	);
};

export default AddNewFab;

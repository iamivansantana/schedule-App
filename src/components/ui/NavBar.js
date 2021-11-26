import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { startLogOut } from '../../actions/authActions';

const NavBar = () => {
	const dispatch = useDispatch();
	const { name } = useSelector((state) => state.auth);
	const handleLogOut = () => {
		dispatch(startLogOut());
	};
	return (
		<div className='navbar navbar-dark bg-dark mb-4'>
			<span className='navbar-brand'>{name}</span>
			<button onClick={handleLogOut} className='btn btn-outline-danger'>
				<i className='fas fa-sign-out-alt'></i>
				<span> Salir</span>
			</button>
		</div>
	);
};

export default NavBar;

import React from 'react';
import AppRouter from './routers/AppRouter';
import { Provider } from 'react-redux';
import { store } from './store/store';

const ScheduleApp = () => {
	return (
		<div>
			<Provider store={store}>
				<AppRouter />
			</Provider>
		</div>
	);
};

export default ScheduleApp;

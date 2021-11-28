import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../ui/NavBar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import { messages } from '../../helpers/calendar-messages-es-';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CalendarEvent from './CalendarEvent';
import CalendarModal from './CalendarModal';
import { uiOpenModal } from '../../actions/uiActions';
import {
	eventCleanActive,
	eventSetActive,
	eventStartLoading,
} from '../../actions/eventsActions';
import AddNewFab from '../ui/AddNewFab';
import DeleteEventFab from '../ui/DeleteEventFab';

moment.locale('es');
const localizer = momentLocalizer(moment);

//Inicio del Componente
const CalendarScreen = () => {
	const dispatch = useDispatch();
	const { events, activeEvent } = useSelector((state) => state.calendar);
	const { uid } = useSelector((state) => state.auth);

	const [lastView, setLastView] = useState(
		localStorage.getItem('lastView') || 'month'
	);

	const onDoubleClick = (e) => {
		console.log('abriendo modal');
		dispatch(uiOpenModal());
	};
	const onSelectEvent = (e) => {
		dispatch(eventSetActive(e));
	};
	const onViewChange = (e) => {
		setLastView(e);
		localStorage.setItem('lastView', e);
	};

	const onSelectSlot = (e) => {
		dispatch(eventCleanActive());
	};

	const eventStyleGetter = (event, start, end, isSelecter) => {
		const style = {
			backgroundColor: uid === event.user._id ? '#367cf7' : '#5c1d1d',
			borderRadius: '0px',
			opacity: '0.8',
			display: 'block',
			color: 'white',
		};
		return {
			style,
		};
	};

	useEffect(() => {
		dispatch(eventStartLoading());
	}, [dispatch]);
	return (
		<div className='calendar-screen'>
			<NavBar />
			<Calendar
				localizer={localizer}
				events={events}
				startAccessor='start'
				endAccessor='end'
				style={{ height: 500 }}
				messages={messages}
				eventPropGetter={eventStyleGetter}
				onDoubleClickEvent={onDoubleClick}
				onSelectEvent={onSelectEvent}
				onView={onViewChange}
				onSelectSlot={onSelectSlot}
				selectable={true}
				view={lastView}
				components={{
					event: CalendarEvent,
				}}
			/>

			<AddNewFab />
			{activeEvent && <DeleteEventFab />}

			<CalendarModal />
		</div>
	);
};

export default CalendarScreen;

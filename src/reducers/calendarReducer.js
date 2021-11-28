import { types } from '../types/typess';

// {
// 	id: 'sdkfjsbgjbf',
// 	title: 'CumpleañosJEfe',
// 	start: moment().toDate(),
// 	end: moment().add(2, 'hours').toDate(),
// 	bgColor: '#fafafa',
// 	notes: 'comprar pastel',
// 	user: {
// 		_id: '123',
// 		name: 'Ivan',
// 	},
// }

const initialState = {
	events: [],
	activeEvent: null,
};

export const calendarReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.eventSetActive:
			return {
				...state,
				activeEvent: action.payload,
			};
		case types.eventCleanActive:
			return {
				...state,
				activeEvent: null,
			};
		case types.eventAddNew:
			return {
				...state,
				events: [...state.events, action.payload],
			};

		case types.eventUpdated:
			console.log(action.payload);
			return {
				...state,
				events: state.events.map((e) =>
					e.id === action.payload.id ? action.payload : e
				),
			};
		case types.eventDeleted:
			return {
				...state,
				events: state.events.filter((e) => e.id !== state.activeEvent.id),
				activeEvent: null,
			};

		case types.eventsLoaded:
			return {
				...state,
				events: [...action.payload],
			};
		case types.eventLogOut:
			return {
				...initialState,
			};

		default:
			return state;
	}
};

import { types } from '../types/typess';

const initialState = {
	checking: true,
	// uid:null,
	// name:null
};

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.authLogin:
			return {
				...state,
				...action.payload,
				checking: false,
			};

		case types.authCheckinFinish:
			return {
				...state,
				checking: false,
			};
		case types.authLogout:
			return {
				checking: false,
			};

		default:
			return state;
	}
};

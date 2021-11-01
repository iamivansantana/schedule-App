import { types } from '../types/typess';
const initialState = {
	modalOpen: false,
};

export const uiReducers = (state = initialState, action) => {
	switch (action.type) {
		case types.uiOpenModal:
			return {
				...state,
				modalOpen: true,
			};
		case types.uiCloseModal:
			return {
				...state,
				modalOpen: false,
			};

		default:
			return state;
	}
};

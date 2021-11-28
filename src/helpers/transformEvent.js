//helper para transformar la fecha del evento(end & start) de 'string' a tipo Date.

import moment from 'moment';

export const transformEvent = (events = []) => {
	return events.map((e) => ({
		...e,
		end: moment(e.end).toDate(),
		start: moment(e.start).toDate(),
	}));
};

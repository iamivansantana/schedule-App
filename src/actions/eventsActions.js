import { fetchConToken } from '../helpers/fetch';
import { transformEvent } from '../helpers/transformEvent';
import { types } from '../types/typess';

//recibe el event (nuevo evento del calendario con titulo, notas, fecha de inicio, fecha de fin)
export const eventStartAddNew = (event) => {
	return async (dispatch, getState) => {
		const { uid, name } = getState().auth;
		try {
			const resp = await fetchConToken('events', event, 'POST');
			const body = await resp.json();

			//Si la peticion se cumplio
			if (body.ok) {
				//agregamos el id y el user de redux al evento por que la respuesta solo trae el user id
				//se podria modificar el backen o hacer una nueva consulta mandando el id y que retorne los datos del usuario.
				event.id = body.evento.id;
				event.user = {
					_id: uid,
					name: name,
				};

				//Se hace el dispatch del evento recibido en el metodo y no el evento recivido (que se guardo) en la respuesta de la api
				//porque la respuesta de la api el evento la fecha(Date) es un string y para evitar convertir se toma el que es tipo date, ya que es el mismo evento
				dispatch(eventAddNew(event));
			}
		} catch (error) {
			console.log(error);
		}
	};
};

const eventAddNew = (event) => ({
	type: types.eventAddNew,
	payload: event,
});

export const eventSetActive = (event) => ({
	type: types.eventSetActive,
	payload: event,
});
export const eventCleanActive = () => ({
	type: types.eventCleanActive,
});
export const eventUpdated = (event) => ({
	type: types.eventUpdated,
	payload: event,
});
export const eventDeleted = () => ({
	type: types.eventDeleted,
});

export const eventStartLoading = () => {
	return async (dispatch) => {
		try {
			const resp = await fetchConToken('events');
			const body = await resp.json();

			//Esta opcion tambien es aceptada en algunas verciones
			// const events = body.eventos;
			const events = transformEvent(body.eventos);

			dispatch(eventsLoaded(events));
		} catch (error) {
			console.log(error);
		}
	};
};

const eventsLoaded = (events) => ({
	type: types.eventsLoaded,
	payload: events,
});

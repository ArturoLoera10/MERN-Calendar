import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewEvent,
  onDeletedEvent,
  onSetActiveEvent,
  onUpdatedEvent,
} from "../store";

export const useCalendarStore = () => {
  const dispatch = useDispatch();

  const { events, activeEvent } = useSelector((state) => state.calendar);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    // TODO: llegar al backend
    if (calendarEvent._id) {
      // Actualizar
      dispatch(onUpdatedEvent({ ...calendarEvent }));
    } else {
      // Crear
      dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
    }
  };

  const startDeletingEvent = () => {
    dispatch(onDeletedEvent());
  };

  return {
    // Propiedades
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    // Métodos
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
  };
};

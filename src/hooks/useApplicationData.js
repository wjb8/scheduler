import { useReducer, useEffect } from "react";
import axios from "axios";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "../helpers/reducer";

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {
      1: {
        id: 1,
        time: "12pm",
        interview: {
          student: "Bob",
          interviewer: 1
        }
      },
      2: {
        id: 2,
        time: "2pm",
        interview: null
      }
    },
    interviewers: {}
  });

  const setDay = (day) => dispatch({ type: SET_DAY, day });

  const updateSpots = (days, appointments, id) => {
    const givenDay = state.day; // 'Monday'
    const dayToUpdate = days.find((day) => day.name === givenDay);
    const dayToUpdateIndex = state.days.findIndex(
      (day) => day.name === givenDay
    );
    const listOfAppointmentIds = dayToUpdate.appointments; // [1,2,3]

    const spots = listOfAppointmentIds.filter(
      (appointmentId) => appointments[appointmentId].interview === null
    ).length;

    const updatedDay = { ...dayToUpdate, spots };
    const updatedDays = [...days];
    updatedDays[dayToUpdateIndex] = updatedDay;

    return updatedDays;
  };

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = updateSpots(state.days, appointments, id);

    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then(() => dispatch({ type: SET_INTERVIEW, appointments, days }));
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = updateSpots(state.days, appointments, id);

    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => dispatch({ type: SET_INTERVIEW, appointments, days }));
  };

  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`)
    ])
      .then((response) => {
        dispatch({
          type: SET_APPLICATION_DATA,
          response
        });
      })
      .catch((err) => console.log(err));
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}

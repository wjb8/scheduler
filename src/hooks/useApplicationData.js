import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {
      1: {
        id: 1,
        time: "12pm",
        interview: {
          student: "Bob",
          interviewer: 1,
        },
      },
      2: {
        id: 2,
        time: "2pm",
        interview: null,
      },
    },
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  const updateSpots = (days, appointments, id) => {
    const givenDay = state.day; // 'Monday'
    const dayToUpdate = days.find((day) => day.name === givenDay);
    const dayToUpdateIndex = state.days.findIndex(
      (day) => day.name === givenDay
    );
    const listOfAppointmentIds = dayToUpdate.appointments; // [1,2,3]
    console.log(listOfAppointmentIds);

    const spots = listOfAppointmentIds.filter(
      (appointmentId) => appointments[appointmentId].interview === null
    ).length;

    const updatedDay = { ...dayToUpdate, spots };
    const updatedDays = [...days];
    updatedDays[dayToUpdateIndex] = updatedDay;

    return updatedDays;
  };

  const bookInterview = (id, interview) => {
    console.log("bookInterview: ", id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = updateSpots(state.days, appointments, id);

    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then(() => setState({ ...state, appointments, days }));
  };

  const cancelInterview = (id) => {
    console.log("cancelInterview: ", id);

    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = updateSpots(state.days, appointments, id);

    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => setState({ ...state, appointments, days }));
  };

  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:8001/api/days`),
      axios.get(`http://localhost:8001/api/appointments`),
      axios.get(`http://localhost:8001/api/interviewers`),
    ]).then((all) =>
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }))
    );
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}

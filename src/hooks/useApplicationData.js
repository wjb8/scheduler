import { useState, useEffect } from 'react';
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {
      "1": {
        id: 1,
        time: "12pm",
        interview: null
      }
    },
    interviewers: {}
  })

  const setDay = day => setState({ ...state, day });

  const updateDays = (days, updatedAppointments, updatedAppointmentId) => {
    const getSpotsRemaining = (day) => {
      const spotsRemaining = day.appointments.reduce((emptySpots, appointmentId) => {
        if (updatedAppointments[appointmentId].interview === null) emptySpots++;
        return emptySpots;
      }, 0);

      return spotsRemaining;
    }

    // Iterate over days array and create a copy of each day & update the spots remaining for the day updated
    const newDays = days.map((day) => {
      return day.appointments.includes(updatedAppointmentId) ? {...day, spots: getSpotsRemaining(day)} : day
    })

    return newDays;
  }

  const bookInterview = (id, interview) => {
    console.log('bookInterview: ', id, interview);
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = updateDays(state.days, appointments, id);

    return axios.put(`/api/appointments/${id}`, {interview})
    .then(() => setState({...state, appointments, days}))

  };

  const cancelInterview = (id) => {
    console.log('cancelInterview: ', id);

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    const days = updateDays(state.days, appointments, id);

    return axios.delete(`/api/appointments/${id}`)
    .then(() => setState({...state, appointments, days}))
  }

  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:8001/api/days`),
      axios.get(`http://localhost:8001/api/appointments`),
      axios.get(`http://localhost:8001/api/interviewers`)
    ]).then(all => setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data})))
  }, [])

  return { state, setDay, bookInterview, cancelInterview };

}
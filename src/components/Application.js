import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList"
import Appointment from "components/Appointment"

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "7pm",
    interview: {
      student: "Sacka Wacka",
      interviewer: {
        id: 1,
        name: "Fred Penner",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  },
  {
    id: 4,
    time: "3pm",
  },
  {
    id: 5,
    time: "12pm",
    interview: {
      student: "Bob Mould",
      interviewer: {
        id: 1,
        name: "Captain Beefheart",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  }
];

export default function Application(props) {
  const listAppointments = appointments.map(appointment => 
    <Appointment
      key={appointment.id}
      {... appointment}
    />
  )

  const [day, setDay] = useState('Monday');
  const [days, setDays] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8001/api/days`).then(response => setDays(response.data))
  })

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={days}
            day={day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {listAppointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}

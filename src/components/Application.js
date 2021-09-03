import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    currentDay: "Monday",
    days: [],
    appointments: {},
  });
<<<<<<< HEAD

  const setCurrentDay = (currentDay) => setState({ ...state, currentDay });

  const dailyAppointments = getAppointmentsForDay(state, state.currentDay);

  const parsedAppointments = dailyAppointments.map((appointment, i) => {
    return <Appointment key={i} {...appointment} />;
  });

  // API request
=======
  // setStates
  const setCurrentDay = (currentDay) => setState({ ...state, currentDay });
  const setDays = (days) => setState((prev) => ({...prev, days}));
  

  const parsedAppointments = appointments.map((appointment, i) => {
    // ! key is currently set to i(index)
    return <Appointment key={i} {...appointment} />;
  });

  // Get day data
>>>>>>> 5f43da1647e28201f79dc705edfbdf0372c4d96f
  useEffect(() => {
    // Get API request from /days and /appointments
    Promise.all([axios.get("api/days"), axios.get("api/appointments")])
      .then((all) => {
        // setState for days, appointments at once
        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
        }));
      })
      .catch((err) => {
        return err;
      });
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />

        <DayList
          {...{
            days: state.days,
            day: state.currentDay,
            setDay: setCurrentDay,
          }}
        />

        <nav className="sidebar__menu"></nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {parsedAppointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}

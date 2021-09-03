import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import axios from "axios";

export default function Application(props) {
  const [state, setState] = useState({
    currentDay: "Monday",
    days: [],
    appointments: {},
  });
  // setStates
  const setCurrentDay = (currentDay) => setState({ ...state, currentDay });
  const setDays = (days) => setState((prev) => ({...prev, days}));
  
  const dailyAppointments = [];

  const parsedAppointments = dailyAppointments.map((appointment, i) => {
    // ! key is currently set to i(index)
    return <Appointment key={i} {...appointment} />;
  });

  // API request GET days data
  useEffect(() => {
    axios
      .get("/api/days")
      .then((response) => {
        setDays(response.data);
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

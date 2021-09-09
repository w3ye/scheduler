import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    currentDay: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  const setCurrentDay = (currentDay) => setState({ ...state, currentDay });

  /**
   * Create a new interview
   * @param {string} id
   * @param {Object} interview
   * @returns {Promise}
   */
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`/api/appointments/${id}`, {
        interview,
      })
      .then((result) => {
        setState({
          ...state,
          appointments,
        });
      })
      .finally(() => {
        updateSpots();
      });
  }

  /**
   * Cancel an exisiting interview/appointment
   * @param {string} id
   * @returns {Promise}
   */
  function cancelInterview(id) {
    // Set the appointment interview to null
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    // Set a new appointments array
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .delete(`/api/appointments/${id}`, {})
      .then((res) => {
        setState({
          ...state,
          appointments,
        });
      })
      .finally(() => {
        updateSpots();
      });
  }

  /**
   * Update spots when a user creates/deletes an interview
   */
  function updateSpots() {
    const newDays = state.days.map((day) => {
      if (day.name === state.currentDay) {
        const emptyAppointment = day.appointments.filter((appointment) => {
          return state.appointments[appointment].interview;
        });
        console.log("emptyAppointment:", emptyAppointment);
        // available spots would be equal to the total empty interviews for the day
        day.spots = emptyAppointment.length;
      }
      return day;
    });
    console.log("newDays:", newDays);
    setState((prev) => ({
      ...prev,
      days: newDays,
    }));
  }

  // API request
  useEffect(() => {
    // Get API request from /days and /appointments
    Promise.all([
      axios.get("api/days"),
      axios.get("api/appointments"),
      axios.get("api/interviewers"),
    ])
      .then((all) => {
        // setState for days, appointments at once
        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }));
      })
      .catch((err) => {
        return err;
      });
  }, []);

  return { state, setCurrentDay, bookInterview, cancelInterview, updateSpots };
}

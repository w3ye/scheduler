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
        const newDays = updateSpots(appointments);
        setState({
          ...state,
          appointments,
          days: newDays,
        });
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

    return axios.delete(`/api/appointments/${id}`, {}).then((result) => {
      const newDays = updateSpots(appointments);
      setState({
        ...state,
        appointments,
        days: newDays,
      });
    });
  }

  /**
   * Update spots when a user creates/deletes an interview
   */
  function updateSpots(appointments) {
    let currentDayIndex;
    const newDays = [...state.days];
    const currentDay = state.days.find((day, index) => {
      // we need the index of the day, since we only want to update the array
      currentDayIndex = index;
      return day.name === state.currentDay;
    });
    const emptyInterviewForCurrentDay = currentDay.appointments.filter(
      (appointment) => {
        // get all the interviews that are null for the day
        return !appointments[appointment].interview;
      }
    );
    newDays[currentDayIndex] = {
      ...newDays[currentDayIndex],
      spots: emptyInterviewForCurrentDay.length,
    };
    return newDays;
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

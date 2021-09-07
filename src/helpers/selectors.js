export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter((i) => i.name === day);
  const resultArr = [];
  filteredDays.forEach((i) => {
    i.appointments.forEach((appointment) => {
      resultArr.push(state.appointments[appointment]);
    });
  });
  return resultArr;
}

export function getInterview(state, interview) {
  const ret = {};
  for (let key in state.interviewers) {
    if (interview === null) return null;
    // when the interviwer in interview matches with interviewer
    if (state.interviewers[key].id === interview.interviewer) {
      ret["student"] = interview.student;
      ret["interviewer"] = state.interviewers[key];
    }
  }
  return ret;
}

/**
 * Get the interviewers for a specific day
 * @param {Object} state
 * @param {string} day
 * @returns {string[]} Array of interviewers
 */
export function getInterviewersForDay(state, day) {
  const ret = [];
  const filteredDays = state.days.filter((i) => i.name === day);
  filteredDays.forEach((i) => {
    i.interviewers.forEach((interviewer) => {
      ret.push(state.interviewers[interviewer]);
    });
  });
  return ret;
}

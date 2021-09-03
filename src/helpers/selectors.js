export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter((i) => i.name === day);
  const resultArr = [];
  filteredDays.forEach((filteredDaysIndex) => {
    filteredDaysIndex.appointments.forEach((appointmentsIndex) => {
      resultArr.push(state.appointments[appointmentsIndex]);
    });
  });
  return resultArr;
}

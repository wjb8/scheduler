export default function getAppointmentsForDay(state, day) {
  const appointmentsForDay = [];
  const dayFound = state.days.find(el => el.name === day);
  
  if (!dayFound) {
    return [];
  }

  dayFound.appointments.forEach(app => {
    appointmentsForDay.push(state.appointments[app])
  });
  
  return appointmentsForDay;
};
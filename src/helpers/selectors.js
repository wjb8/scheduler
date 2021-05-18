export function getAppointmentsForDay(state, day) {
  const appointmentsForDay = [];
  const dayFound = state.days.find((el) => el.name === day);

  if (!dayFound) {
    return [];
  }

  dayFound.appointments.forEach((app) => {
    appointmentsForDay.push(state.appointments[app]);
  });

  return appointmentsForDay;
}

export function getInterviewersForDay(state, day) {
  const interviewersForDay = [];
  const dayFound = state.days.find((el) => el.name === day);

  if (!dayFound) {
    return [];
  }

  dayFound.interviewers.forEach((int) => {
    interviewersForDay.push(state.interviewers[int]);
  });

  return interviewersForDay;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewer = state.interviewers[interview.interviewer];

  return { ...interview, interviewer };
}

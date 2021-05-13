function getAppointmentsForDay(state, day) {
  
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

function getInterview(state, interview) {
  
  if (!interview) {
    return null;
  }
  const interviewer = state.interviewers[interview.interviewer];
  interview.interviewer = interviewer;
  console.log(interview);
  return interview;
  
}

module.exports = {
  getAppointmentsForDay,
  getInterview
}
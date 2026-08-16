export const isTimeOverlap = (
  startA,
  endA,
  startB,
  endB
) => {
  return startA < endB && startB < endA
}

export const hasScheduleConflict = (
  sessions,
  newSession
) => {
  return sessions.some((session) => {
    if (session.date !== newSession.date) {
      return false
    }

    return isTimeOverlap(
      session.startTime,
      session.endTime,
      newSession.startTime,
      newSession.endTime
    )
  })
}
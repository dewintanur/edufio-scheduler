export const getMinimumSessionDate = () => {
  const today = new Date()

  const minimumDate = new Date(today)
  minimumDate.setDate(today.getDate() + 3)

  minimumDate.setHours(0, 0, 0, 0)

  return minimumDate
}

export const isDateSelectable = (date) => {
  const minimumDate = getMinimumSessionDate()

  const selectedDate = new Date(date)
  selectedDate.setHours(0, 0, 0, 0)

  return selectedDate >= minimumDate
}
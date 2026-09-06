const getWeekStart = (date) => {
    const result = new Date(date)
    const day = result.getDay()
    const offset = day === 0 ? -6 : 1 - day
    result.setDate(result.getDate() + offset)
    result.setHours(0, 0, 0, 0)
    return result
}

export const getWeekDays = (date) => {
    const start = getWeekStart(date)
    return Array.from({ length: 7 }, (_, index) => {
        const day = new Date(start)
        day.setDate(start.getDate() + index)
        return day
    })
}

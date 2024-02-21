const toMilliseconds = unit => {
    const seconds = 1000
    const minutes = seconds * 60
    const hours = minutes * 60
    const days = hours * 24

    if (unit === 'seconds') return seconds
    if (unit === 'minutes') return minutes
    if (unit === 'hours') return hours
    if (unit === 'days') return days
}

const date1 = new Date(2024, 2, 0, 0, 10, 21)
const date2 = new Date(2024, 2, 0, 0, 0, 0)

const difference = (date1 - date2)
const minutes = Math.floor(difference / toMilliseconds('minutes'))
const remainder = difference - minutes * toMilliseconds('minutes')
const seconds = remainder / toMilliseconds('seconds')

console.log(minutes)
console.log(seconds)

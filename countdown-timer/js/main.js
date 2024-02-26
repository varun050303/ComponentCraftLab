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


const getCountdown = (endDate, startDate) => {

    let difference = endDate - startDate

    const days = Math.floor(difference / toMilliseconds('days'))
    difference = difference - days * toMilliseconds('days')

    const hours = Math.floor(difference / toMilliseconds('hours'))
    difference = difference - hours * toMilliseconds('hours')

    const minutes = Math.floor(difference / toMilliseconds('minutes'))
    difference = difference - minutes * toMilliseconds('minutes')

    const seconds = Math.floor(difference / toMilliseconds('seconds'))
    difference = difference - seconds * toMilliseconds('seconds')
    return {
        days,
        hours,
        minutes,
        seconds
    }
}

const now = new Date()
const nextMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    1
)


const updateBoxes = nextMonth => {
    const now = new Date()
    const values = getCountdown(nextMonth, now)
    const boxes = document.querySelectorAll('.timer__box')
    boxes.forEach(box => {
        const unit = box.dataset.unit
        const value = values[unit]
        box.firstElementChild.textContent = value
    })
}

setInterval(() => {
    updateBoxes(nextMonth);
}, 1000);
const date = new Date(2024, 1, 15)
const yearMonthIndicator = document.querySelector('.datepicker__year-month')
const monthsInAYear = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]
const month = date.getMonth()
const monthName = monthsInAYear[month]
const year = date.getFullYear()


yearMonthIndicator.innerHTML = `<time datetime="2024-02">${monthName} ${year}</time>`
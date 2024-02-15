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

const createDatePicker = date => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const monthName = monthsInAYear[month]
    const dateTimeMonth = (month + 1).toString().padStart(2, '0')
    const datepicker = document.createElement('div')
    datepicker.classList.add('datepicker')

    const prevNextMonthButtons = `
    <div class="datepicker__buttons">
    <button class="datepicker__previous">
        <img src="./images/arrow.svg">
    </button>
    <button class="datepicker__next">
        <img src="./images/arrow.svg">
    </button>
    </div>
    `

    const calendar = `
    <div class="datepicker__calendar">
                <div class="datepicker__year-month">
                <time datetime="${year}-${dateTimeMonth}">${monthName} ${year}</time>
                </div>
                <div class="datepicker__day-of-week">
                    <div>Sun</div>
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thu</div>
                    <div>Fri</div>
                    <div>Sat</div>
                </div>
                <div class="datepicker__date-grid">${createDateGridHTML(date)}</div>
    </div>`

    datepicker.innerHTML = `
    ${prevNextMonthButtons}
    ${calendar}
    `

    return datepicker

}

const createDateGridHTML = date => {
    const month = date.getMonth()
    const year = date.getFullYear()
    const dateTimeMonth = (month + 1).toString().padStart(2, '0')
    const firstDayOfMonth = new Date(date.setDate(1)).getDay()
    const lastDayInMonth = new Date(2024, month + 1, 0)
    const numDaysInJanuary = lastDayInMonth.getDate()

    const dategrid = document.createElement('div')

    for (let day = 1; day <= numDaysInJanuary; day++) {
        const button = document.createElement('button')
        if (day === 1) button.style.setProperty('--firstDayOfMonth', firstDayOfMonth + 1)
        const datetimeDay = day.toString().padStart(2, '0')
        button.innerHTML = `
        <time datetime="${year}-${dateTimeMonth}-${datetimeDay}">${day}</time>
        `
        dategrid.appendChild(button)
    }

    return dategrid.innerHTML
}

// Add the datepicker into the DOM
const form = document.querySelector('form')
form.appendChild(createDatePicker(date))
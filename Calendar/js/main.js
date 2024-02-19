const date = new Date(2024, 1, 15)
const yearMonthIndicator = document.querySelector('.datepicker__year-month')
const form = document.querySelector('form')
const input = form.querySelector('input')
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

const toTwoDigitString = number => {
    return number.toString().padStart(2, '0')
}

const createDatePicker = (input, date) => {
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

    datepicker.setAttribute('hidden', true)

    document.addEventListener('click', event => {
        if (event.target.closest('.datepicker')) return
        if (event.target.closest('input') === input) return
        datepicker.setAttribute('hidden', true)
    })
    input.addEventListener('click', () => {
        datepicker.removeAttribute('hidden')
    })

    const inputRect = input.getBoundingClientRect()
    const oneRem = parseFloat(getComputedStyle(document.body)['font-size'])
    datepicker.style.left = `${inputRect.left}px`
    datepicker.style.top = `${inputRect.bottom + oneRem}px`

    const getDateFromYearMonthIndicator = _ => {
        const time = datepicker.querySelector('.datepicker__year-month').firstElementChild
        const datetime = time.getAttribute('datetime')
        return datetimeToDate(datetime)
    }

    const previousNextButtons = datepicker.querySelector('.datepicker__buttons')

    previousNextButtons.addEventListener('click', (evt) => {
        if (!evt.target.matches('button')) return

        if (evt.target.matches('.datepicker__previous')) {
            const timeEl = document.querySelector('.datepicker__year-month').firstElementChild;
            const currentDate = getDateFromYearMonthIndicator()

            // Set the date to the first day of the previous month
            currentDate.setMonth(currentDate.getMonth() - 1, 1);

            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            const monthName = monthsInAYear[month];
            const datetimeMonth = toTwoDigitString(month + 1)
            timeEl.textContent = `${monthName} ${year}`;
            timeEl.setAttribute('datetime', `${year}-${datetimeMonth}`);
            const dategrid = datepicker.querySelector('.datepicker__date-grid')
            dategrid.innerHTML = createDateGridHTML(currentDate)
        }

        if (evt.target.matches('.datepicker__next')) {
            const timeEl = document.querySelector('.datepicker__year-month').firstElementChild;
            const currentDate = getDateFromYearMonthIndicator()

            // Set the date to the first day of the next month
            currentDate.setMonth(currentDate.getMonth() + 1, 1);

            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            const monthName = monthsInAYear[month];
            const datetimeMonth = toTwoDigitString(month + 1)

            timeEl.textContent = `${monthName} ${year}`;
            timeEl.setAttribute('datetime', `${year}-${datetimeMonth}`);

            const dategrid = datepicker.querySelector('.datepicker__date-grid')
            dategrid.innerHTML = createDateGridHTML(currentDate)
        }

    })

    const dategrid = datepicker.querySelector('.datepicker__date-grid')
    dategrid.addEventListener('click', (evt) => {
        if (!evt.target.matches('button')) return
        const button = evt.target
        const buttons = [...button.parentElement.children]

        buttons.forEach(button => {
            button.classList.remove('is-selected')
        })
        button.classList.add('is-selected')

        const time = button.firstElementChild
        const datetime = time.getAttribute('datetime')
        const selectedDate = datetimeToDate(datetime)

        const year = selectedDate.getFullYear()
        const month = toTwoDigitString(selectedDate.getMonth() + 1)
        const day = toTwoDigitString(selectedDate.getDate())

        const formatted = `${day}/${month}/${year}`

        input.value = formatted


    })

    return datepicker

}

const createDateGridHTML = date => {
    const month = date.getMonth()
    const year = date.getFullYear()
    const dateTimeMonth = toTwoDigitString(month + 1)
    const firstDayOfMonth = new Date(date.setDate(1)).getDay()
    const lastDayInMonth = new Date(2024, month + 1, 0)
    const numDaysInJanuary = lastDayInMonth.getDate()

    const dategrid = document.createElement('div')

    for (let day = 1; day <= numDaysInJanuary; day++) {
        const button = document.createElement('button')
        button.setAttribute('type', 'button')
        if (day === 1) button.style.setProperty('--firstDayOfMonth', firstDayOfMonth + 1)
        const datetimeDay = toTwoDigitString(day)
        button.innerHTML = `
        <time datetime="${year}-${dateTimeMonth}-${datetimeDay}">${day}</time>
        `
        dategrid.appendChild(button)
    }

    return dategrid.innerHTML
}

form.appendChild(createDatePicker(input, date))

const datetimeToDate = datetime => {
    const [year, month, day = 1] = datetime.split('-').map(num => parseInt(num))
    return new Date(year, month - 1, day)
}

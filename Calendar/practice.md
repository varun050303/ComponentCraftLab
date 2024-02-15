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

const daysInAWeek = [
"Sunday",
"Monday",
"Tuesday",
"Wednesday",
"Thursday",
"Friday",
"Saturday"
]

const shortenString = (string, reverse = false) => {
if (reverse) {
return string.toString().substring(2, 4)
}
return string.substring(0, 3)
}

const today = new Date()
const monthIndex = today.getMonth()
let month = shortenString(monthsInAYear[monthIndex])

const weekIndex = today.getDay()
let week = shortenString(daysInAWeek[weekIndex])
const day = today.getDate()
const year = today.getFullYear()

console.log(`${day.toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${year}`);

console.log(`${month}/${day}/${year}`)

console.log(`${day} ${month}, ${year}`)
console.log(`${day} ${month}, ${week}`)

week = daysInAWeek[weekIndex]
month = monthsInAYear[monthIndex]
console.log(`${week}, ${day} ${month}, ${year}`)

console.log(`${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}:${today.getMilliseconds()}`)
console.log(`${today.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`)

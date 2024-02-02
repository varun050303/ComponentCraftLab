const nameInputField = document.querySelector('input[type="text"]')

nameInputField.addEventListener('blur', (evt) => {
    console.log(evt.target.value)
})

const checkboxes = [...document.querySelectorAll('input[type="checkbox"]')]

// console.log(
//     checkboxes.filter(checkbox => checkbox.checked)
// )

const generateUniqueString = length =>
    Math.random().toString(36).substring(2, 2 + length)

const form = document.querySelector('form')
const output = document.querySelector('.output')
form.addEventListener('submit', (evt) => {
    evt.preventDefault()
    const input = evt.target.querySelector('input')
    const value = input.value.trim()
    input.value = generateUniqueString(8)
    output.innerHTML = DOMPurify.sanitize(value)
})

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', (evt) => {
        if (evt.target.checked) {
            console.log(evt.target.value)
        }
    })

    FormData.preventDefa
})
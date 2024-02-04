const countries = [
    { name: 'Bharat' },
    { name: 'America' },
    { name: 'Russia' },
    { name: 'Berlin' },
    { name: 'Australia' },
    { name: 'Africa' }
]

const typeahead = document.querySelector('.typeahead')
const ul = typeahead.querySelector('ul')
const input = typeahead.querySelector('input')
input.addEventListener('input', evt => {
    const input = evt.target
    const inputValue = input.value.trim().toLowerCase()
    const matches = countries.filter(country => {
        const name = country.name.toLowerCase()
        const newListElement = document.createElement('li')
        // newListElement.innerText = name.startsWith(inputValue)
        // ul.appendChild(newListElement)
    })
})
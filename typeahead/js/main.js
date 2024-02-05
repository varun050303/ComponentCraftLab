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
    ul.innerHTML = ''
    if (!inputValue) return
    ul.removeAttribute('hidden')
    const matches = countries.filter(country => {
        const name = country.name.toLowerCase()
        return name.startsWith(inputValue)
    })

    const listOfMatchedInputElement = matches.map(createListElement)

    listOfMatchedInputElement.forEach(
        listElement => {
            ul.appendChild(listElement)
        }
    )
})

const createListElement = matchedInput => {
    const listElement = document.createElement('li')
    listElement.classList.add('matched_suggestions')
    listElement.innerText = `${matchedInput.name}`

    return listElement
}


document.addEventListener('click', (evt) => {
    if (!evt.target.closest('.typeahead')) {
        ul.setAttribute('hidden', true)
    }
})

ul.addEventListener('click', (evt) => {
    if (!evt.target.matches('li')) return

    const listElement = evt.target;
    input.value = listElement.innerText
    ul.setAttribute('hidden', true)
})
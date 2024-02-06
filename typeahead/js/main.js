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

    const listOfMatchedInputElement = matches.map(match => {
        return createListElement(match, inputValue)
    })

    listOfMatchedInputElement.forEach(
        listElement => {
            ul.appendChild(listElement)
        }
    )
})

const createListElement = (matchedInput, inputValue) => {
    const listElement = document.createElement('li')
    listElement.classList.add('matched_suggestions')
    listElement.innerHTML = boldSearchTerm(matchedInput.name, inputValue)
    return listElement;
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


const boldSearchTerm = (countryName, searchTerms) => {
    const length = searchTerms.length
    const toBold = countryName.substring(0, length)
    const restOfString = countryName.substring(length)
    return `<strong>${toBold}</strong><span>${restOfString}</span>`
}
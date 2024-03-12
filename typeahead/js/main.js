const typeahead = document.querySelector('.typeahead')
const ul = typeahead.querySelector('ul')
fetch('https://restcountries.com/v3.1/all?fields=name,flags')
    .then(response => response.json())
    .then(body => {
        initTypeahead(typeahead, body)
    })
    .catch(error => console.log(error))

const initTypeahead = (typeahead, countries) => {
    const input = typeahead.querySelector('input')
    input.addEventListener('input', evt => {
        const input = evt.target
        const inputValue = input.value.trim().toLowerCase()

        if (!inputValue) return ul.setAttribute('hidden', true)
        const matches = countries.filter(country => {
            const name = country.name.common.toLowerCase()
            return name.startsWith(inputValue)
        })

        const listItems = matches.map(country => {
            return `<li>
            <img src="${country.flags.png}" width="40" height="30" alt="${country.name}'s flag" />
            <span>${boldSearchTerm(country.name.common, inputValue)}</span>
          </li>`
        }).join('')


        ul.innerHTML = listItems
        ul.removeAttribute('hidden')
    })

    ul.addEventListener('click', (evt) => {
        if (!evt.target.matches('li')) return
        const listElement = evt.target;
        input.value = listElement.innerText
        ul.setAttribute('hidden', true)
    })
}

// const createListElement = (matchedInput, inputValue) => {
//     return
//     listElement.innerHTML = boldSearchTerm(matchedInput.name, inputValue)
//     return listElement;
// }

document.addEventListener('click', (evt) => {
    if (!evt.target.closest('.typeahead')) {
        ul.setAttribute('hidden', true)
    }
})

const boldSearchTerm = (countryName, searchTerms) => {
    const length = searchTerms.length
    const toBold = countryName.substring(0, length)
    const restOfString = countryName.substring(length)
    return `<strong>${toBold}</strong><span>${restOfString}</span>`
}
const endpoint = 'https://api.learnjavascript.today/letters'
const lettersEl = document.querySelector('.letters')
const loadMoreButton = document.querySelector('button')
const spinner = document.querySelector('.spinner')
const dribbbleSection = document.querySelector('.dribbble-section')


const hideElement = element => {
    element.setAttribute('hidden', true)
}

const showElement = element => {
    element.removeAttribute('hidden')
}

const addLettersToDom = (letters) => {
    const fragment = document.createDocumentFragment()
    letters.forEach(letter => {
        const li = document.createElement('li')
        li.innerHTML =
            `<a class="letter" href="${letter.shortUrl}">
            <span>By ${letter.creator} </span>
            <img src="${letter.imageUrl}" alt="Picture of ${letter.letter}" width="400" height="300">            
        </a>
        `
        fragment.appendChild(li)
    });
    lettersEl.appendChild(fragment)
}


const fetchLetters = _ => {
    showElement(spinner)
    hideElement(loadMoreButton)

    //fetch letters
    fetch(loadMoreButton.dataset.nextPage).then(r => r.json())
        .then(body => {
            const { letters, nextPage } = body
            addLettersToDom(letters)
            hideElement(spinner)
            showElement(loadMoreButton)

            if (nextPage) {
                loadMoreButton.dataset.nextPage = nextPage
            } else {
                hideElement(loadMoreButton)
                showElement(dribbbleSection)
            }
        })
}

loadMoreButton.addEventListener('click', fetchLetters)
loadMoreButton.dataset.nextPage = `${endpoint}?limit=6&page=1`
loadMoreButton.click()

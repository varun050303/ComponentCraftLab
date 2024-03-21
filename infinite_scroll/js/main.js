const endpoint = 'https://api.learnjavascript.today/letters'
const lettersEl = document.querySelector('.letters')
const button = document.querySelector('button')
const spinner = document.querySelector('.spinner')
const dribbbleSection = document.querySelector('.dribbble-section')


fetch(`${endpoint}?limit=6&page=1`).then(r => r.json())
    .then(body => {
        const { letters, nextPage } = body
        button.dataset.nextPage = nextPage
        spinner.setAttribute('hidden', true)
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
            lettersEl.appendChild(fragment)
        });
    })

button.addEventListener('click', () => {
    spinner.removeAttribute('hidden')
    button.setAttribute('hidden', true)
    fetch(`${button.dataset.nextPage}`).then(r => r.json())
        .then(body => {
            const { letters, nextPage } = body
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
                lettersEl.appendChild(fragment)
                spinner.setAttribute('hidden', true)
                button.removeAttribute('hidden')
                if (nextPage) {
                    button.dataset.nextPage = nextPage
                } else {
                    button.setAttribute('hidden', true)
                    dribbbleSection.removeAttribute('hidden')
                }
            })
        })
})
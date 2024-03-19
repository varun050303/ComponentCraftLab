const books = [...document.querySelectorAll('.book')]

const incomingObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
        }
    });
}, {
    rootMargin: '0px 0px -10% 0px'
})

const outcomingObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting && entry.boundingClientRect.top > 0) {
            entry.target.classList.remove('is-visible')
        }
    })
})

books.forEach(book => {
    incomingObserver.observe(book)
    outcomingObserver.observe(book)
})
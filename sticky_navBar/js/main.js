const element = document.querySelector('.scrollable')
const nav = document.querySelector('nav')
const navHeight = nav.getBoundingClientRect().height
let prevScrollPos = window.scrollY

window.addEventListener('scroll', (evt) => {
    const scrollPos = window.scrollY

    if (scrollPos > prevScrollPos) {
        nav.style.top = `-${navHeight}px`
    } else {
        nav.style.top = '0'
    }

    prevScrollPos = scrollPos
})
const element = document.querySelector('.scrollable')
const nav = document.querySelector('nav')
const navHeight = nav.getBoundingClientRect().height
let prevScrollPos = window.scrollY

window.addEventListener('scroll', (evt) => {
    const scrollPos = window.scrollY
    const difference = scrollPos - prevScrollPos
    const currentNavTop = parseFloat(getComputedStyle(nav).top)
    console.log('currentNavTop:', currentNavTop)


    if (scrollPos > prevScrollPos) {
        const navTopValue = Math.abs(currentNavTop - difference)
        if (navTopValue > navHeight) {
            nav.style.top = `-${navHeight}px`
        } else {
            nav.style.top = `-${navTopValue}px`
        }
    } else {
        const navTopValue = currentNavTop - difference

        if (navTopValue > 0) {
            nav.style.top = '0px'
        } else {
            nav.style.top = `${navTopValue}px`
        }
    }
    prevScrollPos = scrollPos
})
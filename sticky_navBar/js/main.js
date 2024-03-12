const element = document.querySelector('.scrollable')

const buttonEl = document.querySelector('button')

buttonEl.addEventListener('click', () => {
    element.scroll({
        top: 350,
        behavior: "smooth",
    })
})
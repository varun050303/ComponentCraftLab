// Start writing JavaScript here!
const body = document.querySelector('body')
const button = document.querySelector('button')

button.addEventListener('click', function () {
    body.classList.toggle('offsite-is-open')
})
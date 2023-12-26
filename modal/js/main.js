button = document.querySelector('button');
closeBtn = document.querySelector('.modal_close-button')
body = document.body;
modalContainer = body.querySelector('.modal-overlay')


button.addEventListener('click', function () {
    body.classList.toggle('modal-is-open')
})


modalContainer.addEventListener('click', e => {
    if (!e.target.closest('.modal')) {
        body.classList.remove('modal-is-open')
    }
})


closeBtn.addEventListener('click', function () {
    body.classList.remove('modal-is-open')
})

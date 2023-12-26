const accordions = document.querySelector('.accordion-container');

accordions.addEventListener('click', e => {
    const accordionHeader = e.target.closest('.accordion__header');
    if (accordionHeader) {
        const accordion = accordionHeader.parentElement;
        accordion.classList.toggle('is-open')
    }
})
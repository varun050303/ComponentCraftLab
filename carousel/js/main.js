const container = document.querySelector('.carousel-container')
const previous_btn = container.querySelector('.carousel__left_button')
const next_btn = container.querySelector('.carousel__right_button')
const slides_container = container.querySelector('.carousel_contents').childNodes[1]
const slides = slides_container.children
const dotsContainer = container.querySelector('.carousel__navigation_dots')
const dots = Array.from(container.querySelectorAll('.carousel__dot'))
let currentIndex = 0


function carouselSlidingLogic(index) {
    slides_container.style.transform = `translate(-${index * slides_container.childNodes[1].offsetWidth}px)`
    currentIndex = index
}

next_btn.addEventListener('click', function () {

    const currentDot = dotsContainer.querySelector('.active')
    const nextDot = currentDot.nextElementSibling
    currentDot.classList.remove('active')
    nextDot.classList.add('active')

    previous_btn.removeAttribute('hidden')

    if (currentIndex < (slides.length - 1)) {
        carouselSlidingLogic(currentIndex + 1);
    }

    if (!slides[currentIndex].nextElementSibling) {
        next_btn.setAttribute('hidden', true)
    }
})

previous_btn.addEventListener('click', function () {

    const currentDot = dotsContainer.querySelector('.active')
    const previousDot = currentDot.previousElementSibling
    currentDot.classList.remove('active')
    previousDot.classList.add('active')
    next_btn.removeAttribute('hidden')

    if (!slides[currentIndex - 1].previousElementSibling) {
        previous_btn.setAttribute('hidden', true)
    }

    if (currentIndex > 0) {
        carouselSlidingLogic(currentIndex - 1);
    }


})



dotsContainer.addEventListener('click', evt => {
    dot = evt.target.closest('button')

    if (dot) {
        let clickedDotIndex

        //To get Clicked dot index
        for (let index = 0; index < dots.length; index++) {
            if (dots[index] === dot) {
                clickedDotIndex = index;
            }
        }

        //add/remove active state from dots
        dots.forEach(dot => {
            dot.classList.remove('active')
        })
        dot.classList.add('active')
        carouselSlidingLogic(clickedDotIndex)


        //add/remove next or previous button from carousel 
        if (clickedDotIndex === 0) {
            previous_btn.setAttribute('hidden', true)
            next_btn.removeAttribute('hidden')
        } else if (clickedDotIndex === dots.length - 1) {
            next_btn.setAttribute('hidden', true)
            previous_btn.removeAttribute('hidden')
        } else {
            next_btn.removeAttribute('hidden', true)
            previous_btn.removeAttribute('hidden')
        }
    }

})
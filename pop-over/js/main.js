// const popoverTrigger = document.querySelector('.trigger-wrapper')
// const popover = document.querySelector('.popover')
// const popoverTriggerRect = popoverTrigger.getBoundingClientRect()
// const triggerCenter = (popoverTriggerRect.left + popoverTriggerRect.right) / 2

// const space = 20;

// const popoverRect = popover.getBoundingClientRect()
// const leftPosition = triggerCenter - popoverRect.width / 2


// popover.style.left = `${leftPosition}px`

// const triggerTop = popoverTriggerRect.top

// const topPosition = triggerTop - popoverRect.height - space


// popover.style.top = `${topPosition}px`


// popover.setAttribute('hidden', true)

// popoverTrigger.addEventListener('click', () => {
//     if (popover.hasAttribute('hidden')) {
//         popover.removeAttribute('hidden')
//     } else {
//         popover.setAttribute('hidden', true)
//     }
// })

// document.addEventListener('click', (evt) => {
//     if (evt.target.closest('.popover') || evt.target.closest('.popover-trigger')) {
//         return
//     }
//     popover.setAttribute('hidden', true)
// })

// const popoverTrigger = document.querySelectorAll('.trigger-wrapper')[1]
// const popover = document.querySelectorAll('.popover')[1]

// const popoverTriggerRect = popoverTrigger.getBoundingClientRect()
// const triggerLeft = popoverTriggerRect.left

// const popoverRect = popover.getBoundingClientRect();
// const space = 20;
// const leftPosition = triggerLeft - popoverRect.width - space

// popover.style.left = `${leftPosition}px`


// const triggerCenter = (popoverTriggerRect.top + popoverTriggerRect.bottom) / 2

// const topPosition = triggerCenter - popoverRect.height / 2

// popover.style.top = `${topPosition}px`


const popoverTriggers = [...document.querySelectorAll('.popover-trigger')];

const calculatePopoverPosition = (popover, popoverTrigger) => {

    const popoverRect = popover.getBoundingClientRect();
    const popoverTriggerRect = popoverTrigger.getBoundingClientRect();
    const space = 20
    const { position } = popover.dataset;

    if (position === 'left') {
        return {
            top: (popoverTriggerRect.top + popoverTriggerRect.bottom) / 2 - popoverRect.height / 2,
            left: popoverTriggerRect.left - popoverRect.width - space
        }
    }
    if (position === 'top') {
        return {
            top: popoverTriggerRect.top - popoverRect.height - space,
            left: (popoverTriggerRect.left + popoverTriggerRect.right) / 2 - popoverRect.width / 2
        }
    }
    if (position === 'right') {
        return {
            top: (popoverTriggerRect.top + popoverTriggerRect.bottom) / 2 - popoverRect.height / 2,
            left: popoverTriggerRect.right + space
        }
    }
    if (position === 'bottom') {
        return {
            top: popoverTriggerRect.bottom + space,
            left: (popoverTriggerRect.left + popoverTriggerRect.right) / 2 - popoverRect.width / 2
        }
    }

    return
}

popoverTriggers.forEach(popoverTrigger => {
    if (!popoverTrigger) {
        return
    }
    const popover = document.querySelector(`#${popoverTrigger.dataset.target}`)
    const popoverPosition = calculatePopoverPosition(popover, popoverTrigger)
    popover.style.left = `${popoverPosition.left}px`
    popover.style.top = `${popoverPosition.top}px`
    popover.setAttribute('hidden', true)

})


document.addEventListener('click', evt => {
    const popoverTrigger = evt.target.closest('.popover-trigger')
    if (!popoverTrigger) return
    let popover = document.querySelector(`#${popoverTrigger.dataset.target}`)

    if (!popover) createPopover(popoverTrigger)
    if (popover.hasAttribute('hidden')) {
        popover.removeAttribute('hidden')
    } else {
        popover.setAttribute('hidden', true)
    }

    if (!evt.target.closest('.popover') && !evt.target.closest('.popover-trigger')) {
        const popovers = [...document.querySelectorAll('.popover')]
        popovers.forEach(popover => popover.setAttribute('hidden', true))
    }
})

const createPopover = popoverTrigger => {
    const popover = document.createElement('div')
    popover.classList.add('popover')
    popover.dataset.position = popover.dataset.popoverPosition
    popover.id = popoverTrigger.dataset.target

    const p = document.createElement('p')
    p.textContent = popoverTrigger.dataset.content

    document.body.appendChild(p)
}


const bottomPopoverTrigger = document.querySelector('.popover-trigger[data-popover-position="bottom"]')
const popover = createPopover(bottomPopoverTrigger)
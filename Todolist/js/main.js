const todolist = document.querySelector('.todolist')
const taskList = todolist.querySelector('.todolist-tasks')
const newTaskButton = todolist.querySelector('button')
const emptyStateDiv = todolist.querySelector('.todolist__empty-state')
const flashContainer = document.querySelector('.flash-container')
const rootEndpoint = 'https://api.learnjavascript.today'
const encoded = btoa('varun505:5050')
const generateUniqueString = length => {
    return Math.random().toString(36).substring(2, 2 + length)
}
const state = {}

/**Method to show user if its online or not */
setConnectionStatus()
window.addEventListener('online', setConnectionStatus)
window.addEventListener('offline', setConnectionStatus)


fetch(`${rootEndpoint}/tasks`, {
    method: 'get',
    headers: {
        Authorization: `Basic ${encoded}`,
    }
})
    .then(r => r.json())
    .then(
        body => {
            state.tasks = body
            state.tasks.forEach(task => {
                const taskElement = makeTaskElement(task)
                taskList.appendChild(taskElement)
            })
            emptyStateDiv.textContent = `Your todo list is empty. Hurray! 🎉`
        }
    )
    .catch(err => console.log(err))



todolist.addEventListener('submit', (evt) => {
    evt.preventDefault()
    const newTaskField = todolist.querySelector('input')
    const inputValue = DOMPurify.sanitize(newTaskField.value.trim())
    const buttonTextElement = newTaskButton.querySelector('span')
    const id = generateUniqueString(10)

    if (!inputValue) return
    const tempTaskElement = makeTaskElement({
        id: generateUniqueString(10),
        name: inputValue,
        done: false,
        state: 'loading',
    })

    taskList.appendChild(tempTaskElement)

    newTaskField.value = ''
    newTaskField.focus()
    newTaskButton.setAttribute('disabled', true)
    buttonTextElement.textContent = 'Adding task..'

    fetch(`${rootEndpoint}/tasks`, {
        method: 'post',
        headers: {
            Authorization: `Basic ${encoded}`,
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            name: inputValue
        })
    }).then(r => {
        return r.json()
            .then(body => {
                if (r.ok) return body
                return Promise.reject({ body })
            })
    })
        .then(body => {
            taskList.removeChild(tempTaskElement)
            const taskElement = makeTaskElement(body)

            taskList.appendChild(taskElement)
        })
        .catch(err => {
            taskList.removeChild(tempTaskElement)
            const errorElement = createErrorMessage(err.body.message)
            flashContainer.appendChild(errorElement)
        })
        .finally(_ => {
            buttonTextElement.textContent = 'Add task'
            newTaskButton.removeAttribute('disabled')
        })

})


todolist.addEventListener('click', (evt) => {
    if (!evt.target.matches('.task__delete-button')) {
        return
    }

    const taskElement = evt.target.parentElement
    const checkbox = taskElement.querySelector('input[type="checkbox"]')
    const id = checkbox.id


    fetch(`${rootEndpoint}/tasks/${id}`, {
        method: 'delete',
        headers: {
            Authorization: `Bearer ${encoded}`
        }
    }).then(r => r.json())

    taskList.removeChild(taskElement)

    if (taskList.children.length === 0) {
        taskList.innerHTML = ''
    }
})

taskList.addEventListener('input', (evt) => {
    // if (!evt.target.matches('.task__name')) return
    const taskElement = evt.target.parentElement
    const checkbox = taskElement.querySelector('input[type="checkbox"]')
    const done = checkbox.checked
    const id = checkbox.id
    const taskInput = taskElement.querySelector('.task__name')
    const name = DOMPurify.sanitize(taskInput.value.trim())

    fetch(`${rootEndpoint}/tasks/${id}`, {
        method: 'put',
        headers: {
            Authorization: `Basic ${encoded}`,
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            done: done
        })
    }).then(r => r.json())
        .then(body => console.log(body))
})

flashContainer.addEventListener('click', (evt) => {
    if (!evt.target.matches('button')) return
    const closeButton = evt.target
    const flashDiv = closeButton.parentElement
    flashContainer.removeChild(flashDiv)
})

const makeTaskElement = ({ id, name, done, state = "loaded" }) => {
    // const uniqueId = generateUniqueString(10)
    let spinner = '';
    if (state === 'loading') {
        spinner = `<img class="task__spinner" src="images/spinner.gif" alt=""/>`
    }

    let checkbox = ''
    if (state === 'loaded') {
        checkbox = `<input type="checkbox" id="${id}" ${done ? 'checked' : ''}/>`
    }

    const taskElement = document.createElement('li')
    taskElement.classList.add('task')
    taskElement.innerHTML = DOMPurify.sanitize(`
                ${spinner}
                ${checkbox}
                <input type="text" class="task__name" value="${name}"/>
                <button type="button" class="task__delete-button">
                    <svg width="10" viewBox="0 0 20 20">
                        <path
                            d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
                    </svg>
                </button>
                    `)
    return taskElement
}

const createErrorMessage = message => {
    message = formatErrorMessage(message)
    const errorElement = document.createElement('div')
    errorElement.classList.add('flash')
    errorElement.dataset.type = 'error'


    errorElement.innerHTML = `
        <svg class="flash__icon" fill="#c6181b" height="20px" width="20px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 27.963 27.963" xml:space="preserve">
        <g id="SVGRepo_bgCarrier" stroke-width="0"/>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
        <g id="SVGRepo_iconCarrier"> <g> <g id="c129_exclamation"> <path d="M13.983,0C6.261,0,0.001,6.259,0.001,13.979c0,7.724,6.26,13.984,13.982,13.984s13.98-6.261,13.98-13.984 C27.963,6.259,21.705,0,13.983,0z M13.983,26.531c-6.933,0-12.55-5.62-12.55-12.553c0-6.93,5.617-12.548,12.55-12.548 c6.931,0,12.549,5.618,12.549,12.548C26.531,20.911,20.913,26.531,13.983,26.531z"/> <polygon points="15.579,17.158 16.191,4.579 11.804,4.579 12.414,17.158 "/> <path d="M13.998,18.546c-1.471,0-2.5,1.029-2.5,2.526c0,1.443,0.999,2.528,2.444,2.528h0.056c1.499,0,2.469-1.085,2.469-2.528 C16.441,19.575,15.468,18.546,13.998,18.546z"/> </g> <g id="Capa_1_207_"> </g> </g> </g>
        </svg>
        <span class="flas__message">${message}</span>
        <button class="flash__close">&#128473</button>
    `

    return errorElement
}

const formatErrorMessage = message => {
    if (message === 'TypeError: Failed to fetch') {
        return 'Failed to reach server. Please try again later.'
    }

    if (message === 'Unauthorized') {
        return 'Invalid username or password. Please check your username or password.'
    }

    return message
}

function setConnectionStatus() {
    navigator.onLine
        ? document.body.dataset.connectionStatus = 'online'
        : document.body.dataset.connectionStatus = 'offline'
}

// fetch('https://api.learnjavascript.today/users', {
//     method: 'post',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//         username: 'varun505',
//         password: '12345678',
//     })
// })
//     .then(r => r.json())
//     .then(body => console.log(body));


/* Creating User */

// fetch(`${rootEndpoint}/users`, {
//     method: 'post',
//     headers: {
//         'content-type': 'application/json'
//     },
//     body: JSON.stringify({
//         username: 'varun505',
//         password: '5050'
//     })
// }).then(r => r.json())
//     .then(body => console.log(body))

/** Creating Task*/
// const id = '65da42077cc0cd9db10c7cae'
// fetch(`${rootEndpoint}/tasks`, {
//     method: 'post',
//     headers: {
//         'content-type': 'application/json',
//         Authorization: `bearer ${encoded}`
//     },
//     body: JSON.stringify({
//         name: 'Learn Javascript'
//     })
// }).then(r => r.json())
//     .then(body => console.log(body))

/** Updating Task */

// fetch(`${rootEndpoint}/tasks/65da3efe7cc0cd9db10c7c9e`, {
//     method: 'put',
//     headers: {
//         'content-type': 'application/json',
//         Authorization: `Basic ${encoded}`
//     },
//     body: JSON.stringify({
//         done: "true"
//     })
// }).then(r => r.json())
//     .then(body => console.log(body))



// fetch(`${rootEndpoint}/users/varun505`)
//     .then(r => r.json())
//     .then(body => console.log(body))


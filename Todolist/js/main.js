const todolist = document.querySelector('.todolist')
const taskList = todolist.querySelector('.todolist-tasks')
const newTaskButton = todolist.querySelector('button')
const emptyStateDiv = todolist.querySelector('.todolist__empty-state')
const rootEndpoint = 'https://api.learnjavascript.today'
const encoded = btoa('varun505:5050')
const generateUniqueString = length => {
    return Math.random().toString(36).substring(2, 2 + length)
}

todolist.addEventListener('submit', (evt) => {
    evt.preventDefault()
    const newTaskField = todolist.querySelector('input')
    const inputValue = newTaskField.value.trim()
    const buttonTextElement = newTaskButton.querySelector('span')
    // const id = generateUniqueString(10)
    if (!inputValue) return
    newTaskButton.setAttribute('disabled', true)
    buttonTextElement.textContent = 'Adding task..'

    fetch(`${rootEndpoint}/tasks`, {
        method: 'post',
        headers: {
            Authorization: `Basic ${encoded}`,
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            name: DOMPurify.sanitize(inputValue)
        })
    }).then(r => r.json())
        .then(body => {
            console.log(body)
            makeTaskElement(body)
            newTaskField.value = ''
            newTaskField.focus()
        })
        .catch(err => console.log(err))
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
        .then(body => console.log(body))

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

const makeTaskElement = ({ id, name, done }) => {
    // const uniqueId = generateUniqueString(10)
    const taskElement = document.createElement('li')
    taskElement.classList.add('task')
    taskElement.innerHTML = DOMPurify.sanitize(`
                <input type="checkbox" id="${id}" ${done ? 'checked' : ''}/>
                <input type="text" class="task__name" value="${name}"/>
                <button type="button" class="task__delete-button">
                    <svg width="10" viewBox="0 0 20 20">
                        <path
                            d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
                    </svg>
                </button>
                    `)
    taskList.appendChild(taskElement)
}

fetch(`${rootEndpoint}/tasks`, {
    method: 'get',
    headers: {
        Authorization: `Basic ${encoded}`,
    }
})
    .then(r => r.json())
    .then(
        body => {
            const tasks = body
            tasks.forEach(task => {
                makeTaskElement(task)
            })
            emptyStateDiv.textContent = `Your todo list is empty. Hurray! 🎉`
        }
    )
    .catch(err => console.log(err))


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


const todolist = document.querySelector('.todolist')
const taskList = todolist.querySelector('.todolist-tasks')
const generateUniqueString = length => {
    return Math.random().toString(36).substring(2, 2 + length)
}

todolist.addEventListener('submit', (evt) => {
    evt.preventDefault()
    const newTaskField = todolist.querySelector('input')
    const inputValue = newTaskField.value.trim()

    //clear the input field
    newTaskField.value = ''

    //focus back on input field
    newTaskField.focus()

    //check if field isn't empty
    if (!inputValue) return

    makeTaskElement(inputValue)

})


todolist.addEventListener('click', (evt) => {
    if (!evt.target.matches('.task__delete-button')) {
        console.log('not delete')
        return
    }

    const taskElement = evt.target.parentElement
    console.log(taskElement)
    taskList.removeChild(taskElement)

    if (taskList.children.length === 0) {
        taskList.innerHTML = ''
    }
})


const makeTaskElement = taskName => {
    const uniqueId = generateUniqueString(10)
    console.log(uniqueId)
    const taskElement = document.createElement('li')
    taskElement.classList.add('task')
    taskElement.innerHTML = DOMPurify.sanitize(`
                <input type="checkbox" id="task-${uniqueId}" />
                <span class="task__name">${taskName}</span>
                <button type="button" class="task__delete-button">
                    <svg width="10" viewBox="0 0 20 20">
                        <path
                            d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
                    </svg>
                </button>
                    `)


    taskList.appendChild(taskElement)
}
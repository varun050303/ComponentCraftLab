const tabby = document.querySelector('.tabby');
const tabs = tabby.querySelectorAll('.tab')
const tabList = tabby.querySelector('.tabs')
const tabContents = Array.from(tabby.querySelectorAll('.tab-content'))

// tabs.forEach(tab => {
//     tab.addEventListener('click', event => {
//         tabs.forEach(t => {
//             t.classList.remove('is-selected')
//         })
//         tab.classList.add('is-selected')

//         tabContext = tab.getAttribute('data-theme')

//         tabContent = tabby.querySelector(`.tab-content[data-theme='${tabContext}'`)

//         tabContents.forEach(c => {
//             c.classList.remove('is-selected')
//         })

//         tabContent.classList.add('is-selected')
//     })
// })

tabList.addEventListener('click', (e) => {
    const tab = e.target
    const target = tab.dataset.target
    const tabContent = tabby.querySelector('#' + target)
    tabs.forEach(tab => {
        tab.classList.remove('is-selected')
    })

    tab.classList.add('is-selected')

    tabContents.forEach(c => {
        c.classList.remove('is-selected')
    })

    tabContent.classList.add('is-selected')
})
/* XML method*/

// const request = new XMLHttpRequest()
// request.addEventListener('load', (evt) => {
//     const repos = JSON.parse(evt.target.response)
//     const data = repos.map(repo => {
//         return {
//             name: repo.name,
//             url: repo['html_url'],
//             stars: repo['stargazers_count']
//         }
//     })

//     const ol = document.createElement('ol')
//     ol.innerHTML = data.map(repo => {
//         return `<li>
//         <a href="${repo.url}">${repo.name} ${repo.stars}</a>
//         </li>
//         `
//     }).join('')

//     document.body.appendChild(ol)
// })

// request.open('get',)
// request.send()



/* Fetch Method*/
// fetch('https://api.github.com/users/varun050303/repos', {
//     method: 'get'
// })
//     .then(response => response.json())
//     .then(repos => {
//         const htmlString = repos.map(repo => {
//             return {
//                 name: repo.name,
//                 url: repo['html_url'],
//                 stars: repo['stargazers_count']
//             }
//         }).filter(repo => repo.stars > 50)
//             .map(repo => `<li>${repo.name}: ${repo.stars} stars </li>`)
//             .join('');

//         const ol = document.createElement('ol')
//         ol.innerHTML = htmlString
//         document.body.appendChild(ol)
//     })


// const buyCake = cakeType => {
//     return new Promise((resolve, reject) => {
//         cakeType === 'black forest' ? resolve('😁') : reject(new Error('😭'))
//     })
// }

// buyCake('black forest').then(reaction => console.log(reaction)).catch(reaction => console.log(reaction))

// const promise = fetch('https://api.github.com/users/varun050303/repos')



// fetch('https://jsonplaceholder.typicode.com/posts/5', {
//     method: 'delete',
//     // headers: {
//     //     'Content-Type': 'application/json'
//     // },
//     // body: JSON.stringify({
//     //     title: 'This is my first article',
//     //     body: 'A shameless plug about myself'
//     // }),
// })
// // .then(r => r.json())
// // .then(d => console.log(d))
// // .catch(err => console.log(err))

// fetch('https://jsonplaceholder.typicode.com/posts/56', {
//     method: 'get'
// })
//     .then(r => r.json())
//     .then(d => console.log(d))
//     .catch(err => console.log(err))

// fetch('https://jsonplaceholder.typicode.com/posts/90', {
//     method: 'delete',
//     // headers: {
//     //     'content-type': 'application/json',
//     // },
//     // body: JSON.stringify({
//     //     title: 'Title of the book',
//     //     body: 'This is an overview or a brief story of what this books about'
//     // })
// })
//     .then(r => r.json())
//     .then(d => console.log(d))
//     .catch(err => console.log(err))

// const encoded = btoa('varun050303:varun2003_*')
// const token = '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'

// fetch('https://api.github.com/user/repos', {
//     headers: {
//         Authorization: `Bearer ${token}`
//     }
// })
//     .then(r => r.json())
//     .then(d => console.log(d))
//     .catch(err => console.log(err))

// fetch('https://api.github.com/users/varun050303/repos')
//     .then(response => {
//         return response.json()
//             .then(body => {
//                 if (response.ok) return body
//                 return Promise.reject({ body })
//             })
//     })
//     .then(body => { console.log('body is', body) })
//     .catch(err => { console.log('error is', err) })


// async function getGithubRepos() {
//     const response = await fetch('https://api.github.com/users/varun050303/repos')
//     return response.json()
// }

const fruitsBasket = {
    apple: '23',
    banana: '12',
    orange: '19'
}

const sleep = ms => {
    return new Promise(resolve => { setTimeout(resolve, ms) })
}

const getNumFruits = fruit => {
    return sleep(1000).then(v => { return fruitsBasket[fruit] })
}

// getNumFruits('apple').then(num => console.log(num))

const control = async _ => {
    console.log('Start')

    const numApples = await getNumFruits("apple");
    console.log(numApples)

    const numBanana = await getNumFruits("banana");
    console.log(numBanana)

    const numOranges = await getNumFruits("orange")
    console.log(numOranges)

    console.log("End")
}

const fruitsToGet = ['apple', 'banana', 'orange'];

const forLoop = _ => {
    console.log("Start")
    fruitsToGet.forEach(fruit => {
        const numFruits = getNumFruits(fruit)
        console.log(numFruits)
    })

    console.log("END")
}

forLoop()
let count = -1;

const callSuperHeroes = (...superHeroes) => {
    count = count + 1
    if (!superHeroes[count]) return clearInterval(id)
    console.log(`${superHeroes[count]} Sup!!`)
}

const id = setInterval(callSuperHeroes, 2000, 'Hulk', 'Iron-Man', 'Thor')

// function Human(firstName, lastName) {
//     this.firstName = firstName
//     this.lastName = lastName

//     this.sayName = function () {
//         console.log(`My Name is ${this.firstName} ${this.lastName}`)
//     }
// }

// const varun = new Human('varun', 'singhal')
// const piyush = new Human('piyush', 'singhal')


// varun.sayName()
// piyush.sayName()

/** Copy Pasting 4 Flavours */

//1. Constructor Syntax
//2. Class Syntax
//3. OLOO Syntax
//4. Factory function Syntax


/** Constructor Syntax */

// function Human(firstName, lastName) {
//     this.firstName = firstName
//     this.lastName = lastName

//     this.sayName = _ => {
//         console.log(`${this.firstName} ${this.lastName}`)
//     }
// }

// const varun = new Human('varun', 'singhal')
// const piyush = new Human('piyush', 'singhal')

// console.log(piyush)


/**Class syntax */

// class Human {
//     constructor(firstName, lastName) {
//         this.firstName = firstName
//         this.lastName = lastName
//         this.sayName = _ => {
//             console.log(`${this.firstName} ${this.lastName}`)
//         }
//     }
// }

// const varun = new Human('varun', 'singhal')
// console.log(varun)

/** OLOO Syntax */
// const Human = {
//     init(firstName, lastName) {
//         this.firstName = firstName
//         this.lastName = lastName
//         this.sayName = _ => {
//             console.log(`${this.firstName} ${this.lastName}`)
//         }

//         return this
//     }
// }

// const varun = Object.create(Human).init('varun', 'singhal')
// console.log(varun)

/*** PROTOTYPAL DELEGATION**/

/**Constructor syntax */

// function Human(firstName, lastName) {
//     this.firstName = firstName
//     this.lastName = lastName
// }

// Human.prototype.sayName = _ => {
//     console.log(`${this.firstName} ${this.lastName}`)
// }


// const varun = new Human('varun', 'singhal')

// console.log(varun)


/** Class Syntax */

// class Human {
//     constructor(firstName, lastName) {
//         this.firstName = firstName
//         this.lastName = lastName
//     }

//     sayName() {
//         console.log(`${this.firstName} ${this.lastName}`)
//     }
// }

// const varun = new Human('varun', 'singhal')

// console.log(varun)

/** OLOO syntax */

// const Human = {
//     init(firstName, lastName) {
//         this.firstName = firstName
//         this.lastName = lastName

//         return this
//     },

//     sayName() {
//         console.log(`${this.firstName} ${this.lastName}`)
//     }
// }

// const varun = Object.create(Human).init('varun', 'singhal')
// console.log(varun)


/*** Don't use arrow function to create methods */

// function Human(firstName, lastName) {
//     this.firstName = firstName
//     this.lastName = lastName
// }

// Human.prototype.getFullName = function () {
//     return `${this.firstName} ${this.lastName}`
// }

// Human.prototype.sayName = () => {
//     console.log(`Hi ! My name is ${this.getFullName()}`)
// }

// const varun = new Human('varun', 'singhal')

// varun.sayName()


/**Classical Inheritance */

// class Human {
//     constructor(firstName, lastName) {
//         this.firstName = firstName
//         this.lastName = lastName
//     }

//     sayName() {
//         console.log(`My name is ${this.firstName} ${this.lastName}`)
//     }
// }

// class Developer extends Human {

// }

// const devVarun = new Developer('varun', 'singhal')

// console.log(devVarun)


/***Encapsulation */

/**this code is faulty as fuel variable is available publicly */
// function Car() {
//     let fuel = 50
//     return {
//         addFuel(amount) {
//             fuel = fuel + amount
//             if (fuel > 100) {
//                 console.log('Fuel Tank capacity exceeded')
//                 fuel = 100
//             }
//         },

//         getFuel() {
//             return console.log(fuel)
//         }
//     }
// }

// const mercedes = Car()
// mercedes.addFuel(140)
// mercedes.getFuel()
// console.log(mercedes)


class CAR {
    #fuel = 90;

    get fuel() {
        return this.#fuel;
    }
}

const nano = new CAR();
console.log(nano.fuel); // This will output: 90
console.log(nano)


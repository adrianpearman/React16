// --- CLASSES ---
class Human {
  consturctor(){
    this.gender = 'male'
  }

  printMyGender(){
    console.log(this.gender);
  }
}

class Person extends Human{
  constructor(){
    super()
    this.name = 'Adrian'
    this.gender = 'male'
  }

  printMyName(){
    console.log(this.name);
  }
}

const person = new Person()
person.printMyName()
person.printMyGender()

// Shorter Syntax for future JavaScript
class Human6 {
  gender = 'male'

  printMyGender = () => {
    console.log(this.gender);
  }
}

class Person6 extends Human{
  name = 'Adrian'
  gender = 'male'

  printMyName = () => {
    console.log(this.name);
  }
}

const person6 = new Person6()
person6.printMyName()
person6.printMyGender()

// Spread Operators 
const numbers = [1,2,3,4,5,6]
const newNumbers = [...numbers, 7,8,9]

console.log(numbers)
console.log(newNumbers)

const person = {
  name: 'Adrian'
}

const newPerson = {
  ...person,
  age: 26
}

console.log(newPerson)

// Rest Operators
const filter = (...args) => {
  return args.filter(el => el === 1)
}

console.log(filter(1,2,3,4))

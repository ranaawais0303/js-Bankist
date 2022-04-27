'use strict'

const dogsJulia = [3, 5, 19, 12, 7];
const dogsKate = [4, 1, 15, 8, 3];

const checkDogs = function(dogsJuli, dogsKat) {
    const dogsJuliaCorrected = dogsJuli;
    // dogsJuliaCorrected.splice(1, 1, 4)
    dogsJuliaCorrected.splice(-2);
    dogsJuliaCorrected.splice(0, 1)
    console.log(dogsJuliaCorrected)
        // const dogs = [...dogsJuliaCorrected, ...dogsKat]
    const dogs = dogsJuliaCorrected.concat(dogsKat);
    dogs.forEach(function(dog, i) {

        const output = dog >= 3 ? 'an adult' : 'still a puppy'
        console.log(`Dog number ${i+1} is ${output}, and ${dog} year old`)

    });
}
checkDogs(dogsJulia, dogsKate)

//challnge 2 

const calcAverageHumanAge = function(ages) {
    const humanAges = ages.map(age => (age <= 2 ? age * 2 : 16 + age * 4))
    const adult = humanAges.filter(age => age >= 18);
    // const sum = adult.reduce((acc, age) => acc + age) / adult.length;
    const sum = adult.reduce((acc, age, i, arr) => acc + age / arr.length, 0)
    return sum
};
const avg = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg1 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(avg, avg1)

//challenge 3

const calcAverageHumanAge2 = function(ages) {
    const humAges = ages.map(age => (age <= 2 ? age * 2 : 16 + age * 4))
        .filter(age => age >= 18)
        .reduce((acc, age, i, arr) => acc + age / arr.length, 0)
}

//challenge 4

const dogs = [{
        weight: 22,
        curFood: 250,
        owners: ['Alice', 'Bob']
    },
    {
        weight: 8,
        curFood: 200,
        owners: ['Matilda']
    },
    {
        weight: 13,
        curFood: 275,
        owners: ['Sarah', 'John']
    },
    {
        weight: 32,
        curFood: 340,
        owners: ['Michael']
    }
]


//1-loop over the array

dogs.forEach(entry =>
    (entry.recomendedFood = Math.trunc(entry.weight ** 0.75 * 28))
);

//2nd task search sara dog and console whether 
const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'))
console.log(dogSarah)
console.log(`
Sarah's dog is eating Too ${dogSarah.curFood > dogSarah.recomendedFood ?
    ' Much' :  ' Little'}
    `)


//3
//create an array containing all the owners of dogs who eat too much
const eatTooMuch = dogs.filter(dog => dog.curFood > dog.recomendedFood)
    .map(dog => dog.owners).flat();
console.log(eatTooMuch)
const eatTooLittle = dogs.filter(dog => dog.curFood < dog.recomendedFood)
    .flatMap(dog => dog.owners);
console.log(eatTooLittle)

//4
//log string to console for each array

console.log(`${eatTooMuch.join(' and ')}'s dogs eat too much and ${
    eatTooLittle.join(' and ')}'s dogs eat too little`)

//5
//log console whether there is any dog eating exactly the amount of food
//that is recomended
console.log(dogs.some(dog => dog.curFood === dog.recomendedFood))
    //6 
    //log there is any dog eating an okay amount of food
const checkEatingOkay = dog => dog.curFood >
    (dog.recomendedFood * 0.9) &&
    dog.curFood < (dog.recomendedFood * 1.1)
console.log(dogs.some(checkEatingOkay))
    //7
    //array containg the dogs that are eating an okay amount of food
console.log(dogs.filter(checkEatingOkay))

//8
//sort it by recomended food portion in an ascending order
//shallow copy
const dogsSorted = dogs.slice().sort((a, b) =>
    a.recomendedFood - b.recomendedFood);
console.log(dogsSorted)
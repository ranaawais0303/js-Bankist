'use strict'

const dogsJulia = [3, 5, 19, 12, 7];
const dogsKate = [4, 1, 15, 8, 3];

const checkDogs = function(dogsJuli, dogsKat) {
    const dogsJuliaCorrected = dogsJuli;
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
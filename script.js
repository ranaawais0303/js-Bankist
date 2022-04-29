'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
    interestRate: 1.2, // %
    pin: 1111,

    movementsDates: [
        '2019-11-18T21:31:17.178Z',
        '2019-12-23T07:42:02.383Z',
        '2020-01-28T09:15:04.904Z',
        '2020-04-01T10:17:24.185Z',
        '2020-05-08T14:11:59.604Z',
        '2022-04-26T14:43:26.374Z',
        '2022-04-27T18:49:59.371Z',
        '2022-04-28T12:01:20.894Z',
    ],
    currency: 'EUR',
    locale: 'pt-PT', // de-DE
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,

    movementsDates: [
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2022-03-26T14:43:26.374Z',
        '2022-03-27T18:49:59.371Z',
        '2022-03-28T12:01:20.894Z',
    ],
    currency: 'USD',
    locale: 'en-US',
};

const accounts = [account1, account2];

// Data
// const account1 = {
//     owner: 'Jonas Schmedtmann',
//     movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//     interestRate: 1.2, // %
//     pin: 1111,
// };

// const account2 = {
//     owner: 'Jessica Davis',
//     movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//     interestRate: 1.5,
//     pin: 2222,
// };

// const account3 = {
//     owner: 'Steven Thomas Williams',
//     movements: [200, -200, 340, -300, -20, 50, 400, -460],
//     interestRate: 0.7,
//     pin: 3333,
// };

// const account4 = {
//     owner: 'Sarah Smith',
//     movements: [430, 1000, 700, 50, 90],
//     interestRate: 1,
//     pin: 4444,
// };

// const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


//start from here


//date formatter
const formatMovementDate = function(date, locale) {
    const calcDaysPassed = (date1, date2) =>
        Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24))

    const dayPassed = calcDaysPassed(new Date(), date)
    if (dayPassed === 0) return 'Today';
    if (dayPassed === 1) return 'Yesterday';
    if (dayPassed <= 7) return `${dayPassed} days ago `;

    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth()+1}`.padStart(2, 0);
    // const year = date.getFullYear()
    // return `${day}/${month}/${year}`
    return new Intl.DateTimeFormat(locale).format(date)

}

const formatCur = function(value, locale, currency) {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency
    }).format(value)
}

const displayMovements = function(acc, sort = false) {
    containerMovements.innerHTML = ''


    //sort
    const movs = sort ? acc.movements.slice().sort((a, b) =>
        a - b) : acc.movements;

    movs.forEach(function(mov, i) {
        const type = mov > 0 ? 'deposit' : 'withdrawal';
        const date = new Date(acc.movementsDates[i]);

        const displayDate = formatMovementDate(date, acc.locale)
        const formattedMov = formatCur(mov, acc.locale,
            acc.currency)

        const html = `<div class="movements__row">
        <div class="movements__type movements__type--${type}">${
          i+1} ${type}</div>
          <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>`;
        containerMovements.insertAdjacentHTML('afterbegin', html)

    })
};
// displayMovements(account1.movements);



//////////////////////Total balance///////////////////////////////////////////////
const calDisplayBalance = function(acc) {
    acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0)
        // acc.balance = balance;

    // const formattedMov = formatCur(acc.balance, acc.locale,
    //     acc.currency)
    labelBalance.textContent = formatCur(acc.balance, acc.locale,
        acc.currency);
}

//////////////////////Display Summary/////////////////////////////////////////////

const displaySummary = function(acc) {
        //for deposit summary
        const income = acc.movements.filter(mov => mov > 0)
            .reduce((acc, mov) => acc + mov, 0)

        labelSumIn.textContent = formatCur(income, acc.locale,
            acc.currency);;

        //for withdrawl summary
        const out = acc.movements.filter(mov => mov < 0)
            .reduce((acc, mov) => acc + mov, 0)
        labelSumOut.textContent = formatCur(Math.abs(out), acc.locale,
            acc.currency);;

        //for interest summary
        const interest = acc.movements.filter(mov => mov > 0)
            .map(mov => mov * acc.interestRate / 100)
            .filter((int, i, arr) => int >= 1)
            .reduce((acc, mov) => acc + mov, 0)
        labelSumInterest.textContent = formatCur(interest, acc.locale,
            acc.currency);
    }
    // displaySummary(account1.movements)


///////////////////////////computing the username///////////////////////////////////

const user = 'Steven Thomas Williams';
const createUsernames = (accs) => {
    accs.forEach(function(acc) {
        acc.username = acc.owner
            .toLowerCase()
            .split(' ')
            .map(name => name[0]
                // val.slice(0, 1)
            ).join('');
    })

}

createUsernames(accounts)
const updateUI = function(acc) {
    ///////////////////////////Display movements//////////////////////
    displayMovements(acc);

    //////////////////////Display Balance///////////////////////////
    //calDisplayBalance(currentAccount.movements)
    calDisplayBalance(acc)

    ///////////////////// Display summary//////////////////////////
    displaySummary(acc)
        //instead of passing 2 argument we can only pass whole object if you want

}


///////////////////////////Login Functionality///////////////////////////////////

const startLogOutTimer = function() {
    const tick = function() {
        const min = String(Math.trunc(time / 60))
            .padStart(2, 0);
        const sec = String(time % 60).padStart(2, 0);

        //in each call print the remaining tim to UI
        labelTimer.textContent = `${min}:${sec}`;


        //when time 0 second ,stop timer and logout user 
        if (time === 0) {
            clearInterval(timer);
            labelWelcome.textContent = 'log in to get started'
            containerApp.style.opacity = 0
        }

        //decrease 1 second
        time--;
    };
    //set Time to 5 minutes
    let time = 120;

    tick()
        //call the timer every second
    const timer = setInterval(tick, 1000)
    return timer;

}

/////////////////////////////////////////////////
let currentAccount, timer;

// //FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

//event Handler
btnLogin.addEventListener('click', function(e) {
    e.preventDefault();
    console.log('welcom rana')
    currentAccount = accounts.find(
        acc => acc.username === inputLoginUsername.value);
    // if (currentAccount ? .pin = inputLoginPin.value) //same as below
    if (currentAccount && currentAccount.pin === Number(inputLoginPin.value)) {


        /////////////////Display UI and Welcome message/////////////////////
        labelWelcome.textContent = `Welcome back , ${
            currentAccount.owner.split(' ')[0]}`;
        containerApp.style.opacity = 100;
        //set current date and time on toplable
        const now = new Date();
        const options = {
            hour: 'numeric',
            minute: 'numeric',
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',

        };
        // const locale = navigator.language;


        labelDate.textContent = new Intl.DateTimeFormat(
                currentAccount.locale,
                options)
            .format(now)

        //clear the field
        inputLoginUsername.value = inputLoginPin.value = '';
        inputLoginPin.blur();

        //timer
        if (timer) clearInterval(timer);
        timer = startLogOutTimer();
        //update UI
        updateUI(currentAccount);

    }

});

//event listner for Transfer money to anyone
btnTransfer.addEventListener('click', function(e) {
    e.preventDefault();
    const amount = Number(inputTransferAmount.value);
    const receiverAcc = accounts.find(
        acc => acc.username === inputTransferTo.value);
    inputTransferAmount.value = inputTransferTo.value = '';
    if (amount > 0 &&
        receiverAcc &&
        currentAccount.balance >= amount &&
        receiverAcc.username !== currentAccount.username) {
        //doing the transfer
        currentAccount.movements.push(-amount)
        receiverAcc.movements.push(amount)

        //Add transfer date
        currentAccount.movementsDates.push(new Date().toISOString())
        receiverAcc.movementsDates.push(new Date().toISOString())



        //update UI
        updateUI(currentAccount);

        //Reset the timer
        clearInterval(timer);
        timer = startLogOutTimer();
    }
});

// setTimeout(() => { containerApp.style.opacity = 0 }, 5000)
// setInterval(() => {
//     const now = new Date()
//     console.log(now)
// }, 1000)

////////////////////////////Event Listener for button sort////////////

let sorted = false;
btnSort.addEventListener('click', function(e) {
    //user preventDefault because these buttons in the form and
    //always reload the form when click so to avoid reloaded 
    //call preventDefault
    e.preventDefault();
    displayMovements(currentAccount.movements, !sorted)
    sorted = !sorted
})

/////////////////////////////Event listener for Loan//////////////////
btnLoan.addEventListener('click', function(e) {
    e.preventDefault();
    const amount = Math.floor(inputLoanAmount.value); //+means Number()conversion
    if (amount > 0 && currentAccount.movements
        .some(mov => mov >= amount * 0.1)) {


        //setTimeout
        setTimeout(function() { //add movements
            currentAccount.movements.push(amount)

            //Add Loan date
            currentAccount.movementsDates.push(new Date().toISOString())

            //update UI
            updateUI(currentAccount);

            //Reset the timer
            clearInterval(timer);
            timer = startLogOutTimer();

        }, 2500)
    }
    inputLoanAmount.value = ''
        //clear input fields

})

//event listener for close account 
btnClose.addEventListener('click', function(e) {
    e.preventDefault();

    if (inputCloseUsername.value === currentAccount.username &&
        Number(inputClosePin.value) === currentAccount.pin) {
        const index = accounts.findIndex(acc => acc.username ===
            currentAccount.username)


        //Delete account
        accounts.splice(index, 1)

        //hide UI
        containerApp.style.opacity = 0;

    }
    inputCloseUsername.value = inputClosePin.value = ''
})

//////Event Handler for change movements color using reminder /////

labelBalance.addEventListener('click', function() {
    [...document.querySelectorAll('.movements__row')]
    .forEach(function(row, i) {
        if (i % 2 === 0) {
            row.style.backgroundColor = 'orangered'
        }
        if (i % 3 === 0) {
            row.style.backgroundColor = 'blue'
        }
    })
})


/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
//practice of forEach mathod
//from for of loop
for (const [i, mov] of movements.entries()) {
    if (mov > 0) {
        console.log(`Movement ${i+1} : You depositied ${mov}`);
    } else {
        console.log(`Movement ${i+1} : You withdrew ${Math.abs(mov)}`);
    }
}
console.log('-------------forEach--------------')
    //remember the order
movements.forEach(function(mov, i) {
    if (mov > 0) {
        console.log(`Movement ${i+1} : You depositied ${mov}`);
    } else {
        console.log(`Movement ${i+1} : You withdrew ${Math.abs(mov)}`);
    }
});
/////////////Map method//////////////////////////////////
const eurToUsd = 1.1;

//with simple function
// const movementUSD = movements.map(function(mov) {
//     return mov * eurToUsd;
// });

//with Arrow function
const movementUSD = movements.map((mov) => mov * eurToUsd)
console.log(movementUSD)

const movementDescription = movements.map((mov, i) =>
    `Movement ${i+1} : You ${mov>0?'deposited':'withdrew'} ${Math.abs(mov)}`
    // if (mov > 0) {
    //     return (`Movement ${i+1} : You depositied ${mov}`);
    // } else {
    //     return (`Movement ${i+1} : You withdrew ${Math.abs(mov)}`);
    // }
)
console.log(movementDescription)

/////////////Filter method//////////////////////////////////
const deposit = movements.filter(function(mov) {
    return mov > 0;
})
const withdrawls = movements.filter(function(mov) {
    return mov < 0;
})
console.log(movements)
    /////////////Reduce method//////////////////////////////////

//accumulator is like snowballs
const balance = movements.reduce(function(acc, cur, i, arr) {
    console.log(`Iteratin ${i} : ${acc}`)
        //sum +=cur
    return acc + cur;
    //acc=0 we can change this 
}, 0)
console.log(balance)
    //Max Value with reduce
const max = movements.reduce((acc, mov) => {
        if (acc > mov) {
            return acc;
        } else { return mov };
    }, movements[0])
    //const max = Number(Math.max(...movements))  //this is the same as above
console.log(max);

///////////////////total deposit map////////////////////////////////
const totalDepositUSD = movements.filter(mov => mov > 0).map((mov, i, arr) => {
    return mov * eurToUsd;
}).reduce((acc, mov) => acc + mov)
console.log(totalDepositUSD)

///////////////////Find Method////////////////////////////////
const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account)

///////////////////Include Method////////////////////////////////

//EQUAILITY
console.log(movements.includes(-130))

/////////////Some Method////////////////////////////////
////////////CONDITION
const anyDeposits = movements.some(mov => mov > 0)
console.log(anyDeposits)

/////Every Method////////////////////////////////////////

console.log(movements.every(mov => mov > 0))
    // console.log(account4.movements.every(mov => mov > 0))

//Seprate callback
const depos = mov => mov > 0
console.log(movements.some(depos))
console.log(movements.every(depos))
console.log(movements.filter(depos))

////////////////flat and flat map////////////////////
const arr = [
    [1, 2, 3],
    [4, 5, 6], 7, 9
]
console.log(arr.flat())


/////////Array methods practice/////////////////////////////
//1- total deposits in bank
const bankDeposits = accounts
    .flatMap(acc => acc.movements)
    .filter(acc => acc > 0)
    .reduce((sum, cur) => sum + cur, 0)
console.log(bankDeposits)

//2-how many deposit atleast 1000   in bank

// 1 solution const numDeposits = accounts
//     .flatMap(acc => acc.movements).filter(acc => acc >= 1000).length
// console.log(numDeposits)

//2nd solution
const numDeposits = accounts
    .flatMap(acc => acc.movements).reduce((count, cur) =>
        (cur >= 1000 ? ++count : count), 0)
console.log(numDeposits)

//3- create new object

const { deposits, withdrawl } = accounts
    .flatMap(acc => acc.movements)
    .reduce(
        (sums, curr) => {

            // curr > 0 ? (sums.deposit += curr) : (sums.withdrawls += curr)
            sums[curr > 0 ? 'deposits' : 'withdrawl'] += curr
            return sums
        }, { deposits: 0, withdrawl: 0 })
console.log(deposits, withdrawl);

//4 title case
const covertTitleCase = function(title) {
    const capitalize = str => str[0]
        .toUpperCase() + str.slice(1)
    const exceptions = ['a', 'an', 'the', 'but', 'or', 'on', 'in', 'with']

    const titleCase = title
        .toLowerCase()
        .split(' ')
        .map(
            word => exceptions.includes(word) ? word : capitalize(word)
        ).join(' ');
    return capitalize(titleCase);
}
console.log(covertTitleCase('i am Rana aWais m an engineer'));
console.log(covertTitleCase('the am Rana aWais m an h'));
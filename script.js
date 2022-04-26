'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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
const displayMovements = function(move) {
    containerMovements.innerHTML = ''
    move.forEach(function(mov, i) {
        const type = mov > 0 ? 'deposit' : 'withdrawal';
        const html = `<div class="movements__row">
        <div class="movements__type movements__type--${type}">${
          i+1} ${type}</div>
        
        <div class="movements__value">${Math.abs(mov)}€</div>
      </div>`;
        containerMovements.insertAdjacentHTML('afterbegin', html)

    })
};
// displayMovements(account1.movements);

//////////////////////Display Summary/////////////////////////////////////////////

const displaySummary = function(movements, inter) {
        //for deposit summary
        const income = movements.filter(mov => mov > 0)
            .reduce((acc, mov) => acc + mov, 0)

        labelSumIn.textContent = `${ income } €`;

        //for withdrawl summary
        const out = movements.filter(mov => mov < 0)
            .reduce((acc, mov) => acc + mov, 0)
        labelSumOut.textContent = `${ Math.abs(out) } €`;

        //for interest summary
        const interest = movements.filter(mov => mov > 0)
            .map(mov => mov * inter / 100)
            .filter((int, i, arr) => int >= 1)
            .reduce((acc, mov) => acc + mov, 0)
        labelSumInterest.textContent = `${interest} €`
    }
    // displaySummary(account1.movements)

//////////////////////Total balance///////////////////////////////////////////////
const calDisplayBalance = function(acc) {
    acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0)
        // acc.balance = balance;

    labelBalance.textContent = `${acc.balance} €`;
}


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
    displayMovements(acc.movements);

    //////////////////////Display Balance///////////////////////////
    //calDisplayBalance(currentAccount.movements)
    calDisplayBalance(acc)

    ///////////////////// Display summary//////////////////////////
    displaySummary(acc.movements, acc.interestRate)
        //instead of passing 2 argument we can only pass whole object if you want

}
console.log(accounts)

///////////////////////////Login Functionality///////////////////////////////////

//event Handler

let currentAccount;

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
        //clear the field
        inputLoginUsername.value = inputLoginPin.value = '';
        inputLoginPin.blur();
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

        //update UI
        updateUI(currentAccount);

        console.log('Transfer is valid')

    }
});

/////////////////////////////Event listener for Load//////////////////
btnLoan.addEventListener('click', function(e) {
    e.preventDefault();
    const amount = Number(inputLoanAmount.value);
    if (amount > 0 && currentAccount.movements
        .some(mov => mov >= amount * 0.1)) {

        //add movements
        currentAccount.movements.push(amount)

        //update UI
        updateUI(currentAccount)

    }
    //clear input fields
    inputLoanAmount.value = ''

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
console.log(account4.movements.every(mov => mov > 0))

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
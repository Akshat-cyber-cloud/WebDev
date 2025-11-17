// function -> code that doesnt runs directly tab chalega jab aap call karogei


// function Eat(){
//     console.log("EAT");
//     console.log("DRINK");
//     console.log("SLEEP");
// }

// Eat();

function Calculate(x,y){  // parameters
    let sum = x + y;
    // console.log(sum);
    console.log(arguments);
    console.log(arguments[0]);
}

Calculate(5,4); // arguments

// a();  Not allowed variable hoisting -- function hoisting is allowed
// var a = function(){} 

// let a = () => {}  Arrow Function


// function abcd(a,b,...c){ // rest parameter
//     console.log(a,b,c);
// }

// abcd(1,2,3,4,5,6)


// Destructuring
// function abcd({name,age}){
//     console.log(name,age);
// }

// abcd({name : "Akshat", age : 27});


// Spread 
// let arr = [1,2,3,4];

// function abcd(a,b,c,d){
//     console.log(a,b,c,d)
// }

// abcd(...arr);

// Immediately Invoked Function Expression(IIFE)
// (function(){

// })();

// Higher order & Callback function
// First Class  & Pure Function & Function

// let a = 12;
// function abcd(val){
//     console.log(val + 2);
// }

// abcd(12);  // Not used frequently 

// closure / higher order function -> function that returns function but returning function will use parent function variable

// function abcd(){
//     let a = 12;
//     return function(){
//         console.log(a);
//     }
// }

function sayHello(){
    console.log("Hello");
}
sayHello();


function add(a,b){
    return a + b;
}
let val = add(1,2);
console.log(val);



function greeting(guest = "Guest User"){
    console.log(`Hi ${guest}`);
}
greeting("Akshat");


function addunlimited(...nums){
    // console.log(nums); // acts as a array to store multiple values
    let sum = 0;
    nums.forEach(function(val){
        sum += val;
    });
    console.log(sum);

    // Array.reduce() takes all elements of an array and reduces them to a single output value
    // let ans = nums.reduce(function(acc,val){   2nd Way To solve
    //     return acc + val;
    // }, 0);
    // console.log(ans);
}

// addunlimited(1,2,3,4,5)



(function(){
    console.log("I run instantly"); // IIFE
})();


function parent(){
    let a = 12;
    function child(){
        console.log(a);
    }
    child();
}
parent();


let arr = ["apple", "Banana", "Guava", "Mango", "Grapes"];
arr.push("Pear");  // Insert at end
arr.unshift("orange"); // Insert at first

console.log(arr);


for(let i = 0; i < arr.length; i++){
    console.log(arr[i]);
}


let obj = {
    name : "Akshat",
    age: 21,
    city: "Punjab",
};

for(let key in obj){
    console.log(obj[key]);
}


setTimeout(function(){
    console.log("Time is up");
}, 2000)


function runTwice(fn){
    fn();
    fn();
}

runTwice(function() {
    console.log("hello");
})

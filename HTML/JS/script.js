// if(13 > 12){
//     console.log("Greater");
// }else{
//     console.log("Smaller");
// }

// 12 > 13 ? console.log("Greater") : console.log("Smaller");

// switch(1){
//     case 1:
//         console.log("One");
//         break;
//     case 2:
//         console.log("Two");
//         break;
//     default:
//         console.log("Default");
// }

// for(let i = 0; i < 5; i++){
//     console.log(i);
// }

// for(let i = 0; i < 10; i += 2){
//     console.log(i);
// }

// let a = 0,b = 1;

// console.log(a);
// console.log(b);

// for(let i = 2; i < 30; i++){
//     let next = a + b;
//     console.log(next);
//     a = b;
//     b = next;
// }


// String to Integer - We use + before prompt to convert string to integer 
//  AND parseeInt()
//  AND Number()



// let age = prompt("Enter your age: ");

// if(age === null){
//     console.log("User cancelled the prompt.");
// }else if(age.trim() === ""){
//     console.log("Write Properly Again");
// }else if(isNaN(age)){
//     console.log("Write Numeric Value");
// }else{
//     console.log("Your age is " + age);
// }


// for(let i = 1; i < 11; i++){
//     console.log(`5 x ${i} = ${5 * i}`);
// }



// for(let i = 1; i < 11; i++){
//     console.log(`28 x ${i} = ${28 * i}`);
// }



// let password = "admin123";
// let userInput = prompt("Enter your password: ");

// if(userInput === null){
//     console.log("User cancelled the prompt.");
// }else{
//     if(userInput === password){
//         console.log("Access Granted");
//     } else{
//         console.log("Access Denied");
//     }
// }


// let key = "Akshat123"
// let pass = prompt("Set your password: ");

// let count = 0;

// while(count < 3){
//     if(count === 3){
//         console.log("No Attempts Left");
//         break;
//     }

//     if(pass === null){
//         console.log("Try Again ");
//         count++;
//     }else if(pass === key){
//         console.log("Access Granted");
//         break;
//     } else{
//         console.log("Access Denied");
//         pass = prompt("Enter your password again: ");
//         count++;
//     }
// }


// let val = prompt("Tell me some names :");

// while(val != "stop"){
//     console.log(val);
//     val = prompt("Enter Again: ");
// }


// let num = +prompt("Enter a Number: ");

// while(num % 2 !== 0){
//     num = +prompt("Enter Again!");
// }

// let start = +prompt("Enter first value: ");
// let end = +prompt("Enter last value: ");

// if(start > end) console.error("Start Cannot be bigger than end");

// for(let i = start; i <= end; i++){
//     console.log(i);
// }
 
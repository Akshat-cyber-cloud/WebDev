// Arrays are a collection of data 
// How to Create
let arr = [1,2,3];
let arr1 = new Array();

// How to access element
// console.log(arr[2]);

// push 
arr.push(4);

// pop
arr.pop();
 
arr.shift(); // Remove one value from the start

arr.unshift(); // Adds one value at the start

arr.indexOf(2); // index value

// Destructuring
let[a,b] = arr; // a will get 1 b will get 2

// filter -- create a new array containing only the elements that pass a certain condition (test).
let arr2 = [1,2,3,4,5];
arr.filter(function(val){
    return val < 2;
})

// Spread Operator
let spread = [...arr2];
console.log(spread);

// ForEach
arr.forEach(function(val){
    console.log(val);
})


//        OBJECTS

let obj = {
    name: "Akshat",
    age: 21,
    socials: {
        insta: "kjfnbdfd",
        facebook: "fdjnfnds"
    }
};

// to access
obj.name;
obj['name']

// To Delete
delete obj.name;
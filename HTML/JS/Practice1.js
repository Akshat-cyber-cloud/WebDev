const user = {
    name: "Akshat",
    age: 21,
    country: "India"
};

// OLD WAY
// let name = user.name;
// console.log(name);

// OBJECT DESTRUCTURING
const {name,age,country} = user;
console.log(name, age);

// RENAMING
const {name: Akshat, country: nation} = user;
console.log(name);

// NESTED

const employee = {
    id: 101,
    profile: {
        name1: "Akshat",
        city: "Delhi"
    }
};

const {profile : {name1,city} } = employee;
console.log(name1,city);


// COMMON WAY WITH FUNCTIONS
function printUser(user){
    console.log(`${user.name} is from ${user.country}`);
}

printUser(user);

// NEW WAY

function printNewUser({name,country}){
    console.log(`${name} is from ${country}`);
}

printNewUser(user);


// IN ARRAYS DESTRUCTURING 

const fruits = ["apples", "banana", "mango"];
const [first, second, third] = fruits;

console.log(first,second,third);

// SKIPPING VALUES
// const [first, , third] = fruits;
console.log(first, third); 

// DEFAULT VALUES
const [a,b,c = "Grapes"] = ["apples"];
console.log(a,b,c);

// NESTED
const colors = ["red", ["green", "blue"]];
const [primary, [secondary, tertiary]] = colors;

console.log(primary, secondary, tertiary);


// REST OPERATOR
const[last, ...rest] = [10,20,30,40];
console.log(last);
console.log(rest);
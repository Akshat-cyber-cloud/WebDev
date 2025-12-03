let obj = {
    name: "Akshat",
    age: 21,
    email: "asks@gmail.com",
    address: "ddfsdfrr"
}

class Bottle{
    constructor(){  // automatically runs
        // Initialize the value
        this.color = "Blue";
        this.material = "plastic";
        this.price = 132;
    }

    fill() {}
    drink() {}
}

Bottle.prototype.empty = function(){}; // Kind of Shared memory

let bottle1 = new Bottle();

// this is a special keyword 

// global - window
// function - window
// es5 function inside object - object
// es6 function inside object - window

// es5 function inside es5 function inside object - window
// es6 function inside es5 function inside object - object



// function abcd() {
//     console.log(this);
// }

// abcd.call(obj);  helps u use this to avoid getting window rather than an object
// Same goes with apply() and bind()

let user = {
    name: "Akshat",
    email: "akshat@gmail.com",
    login: function(){
        console.log("Logged In");
    },
};

user.login();


class User{
    constructor(name,email){
        this.name = name;
        this.email = email;
    }

    LoggedIn(){
        console.log("Shared Memory")
    }
}

let user1 = new User("Harsh","had@gmail.com")

let product = {
    name: "Cap",
    price: 1000,
    discountedPrice: function(){
        return this.price - 200
    }
};

console.log(product.discountedPrice());
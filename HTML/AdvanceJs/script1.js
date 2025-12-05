// Question 1

// const user = {
//     name: "Akshat",
//     email: "akshat@gmail.com",
//     login: function(){
//         console.log("User Logged In");
//     }
// };

// user.login();
// user.login();


// class User{
//     constructor(name,email){
//         this.name = name;
//         this.email = email;
//     }

//     login(){
//         console.log(this.name + "Logged In");
//     }
// }

// const user1 = new User("Akshat ","a@gmail.com");
// const user2 = new User("Akash","a@gmail.com");

// user1.login();

// const product = {
//     name : "Laptop",
//     price: 50000,
//     getFinalPrice: function(discountPrecent){
//         return this.price - (this.price * discountPrecent / 100);
//     }
// };

// console.log(product.getFinalPrice(10));


// class Car{
//     constructor(brand,speed){
//         this.brand = brand;
//         this.speed = speed;
//     }

//     drive(){
//         console.log(`${this.brand} is driving at ${this.speed} km/h`);
//     }
// }

// const user1 = new Car("BMW",100);
// const user2 = new Car("Bugatti",200);

// user1.drive();
// user2.drive();


// class Student {
//     constructor(name,roll){
//         this.name = name;
//         this.roll = roll;
//     }

//     introduce(){
//         console.log(`My name is ${this.name} and my roll number is ${this.roll}`);
//     }
// };

// const s1 = new Student("Akshat",101);
// s1.introduce();


// const obj = {
//     name: "Javascript",

//     normalFunc: function() {
//         console.log("Normal Function:",this.name);
//     },

//     arrowFunc: () => {
//         console.log("Arrow Function:", this.name);
//     }
// };

// obj.normalFunc();
// obj.arrowFunc();


// function User(name,email){
//     this.name = name;
//     this.email = email;

//     this.login = function(){
//         console.log(this.name + "Logged In");
//     };

//     User.prototype.login = function(){
//         console.log(this.name + "Logged In");
//     }
// }
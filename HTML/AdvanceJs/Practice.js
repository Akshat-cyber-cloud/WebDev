class Driver{
    constructor(name,rating,vehicle){
        this.name = name;
        this.rating = rating;
        this.vehicle = vehicle;
    }

    startRide(){
        console.log(`${this.name} has started the ride in ${this.vehicle}`);
    }
}

Driver.prototype.calculateFare = function (distance){
    return distance * 15;
}

const driver = new Driver("Rohit",4.9,"Hyundai");
// driver.startRide();
// console.log(driver.calculateFare(14));


class Vehicle{
    constructor(type,wheels){
        this.type = type;
        this.wheels = wheels;
    }
}

class Car extends Vehicle{
    constructor(brand){
        super("Car",4);
        this.brand = brand;
    }
}

const c1 = new Car("Kia Seltos");
// console.log(c1);


//  Basic Callback
function greet(name,callback){
    console.log("Hello" + name);
    callback();
}

function askQuestion(){
    console.log("How Are You?");
}

greet("Akshat",askQuestion);

// Live Example 
console.log("Start");

setTimeout(() => {
    console.log("Data Recieved from server");
},2000);

console.log("End");

// Question 1 

function afterDelay(time,callback){
    console.log("First");
    setTimeout(() => {
        callback();
    },time);
}

afterDelay(3000,function(){
    console.log("Callback Executed")
})


// Question 2

function getUser(username,callback){
    setTimeout(() => {
        callback({id: 1, username: "Akshat"});
    }, 1000)
}

function getUserPosts(id,callback){
    setTimeout(() => {
        callback(["Hello", "Good Day" ])
    }, 2000)
}

// Question 3

function loginUser(username,cb){
    setTimeout(() => {
        cb({id: 1212, username: "Akshat"});
    }, 1000)
}
function fetchPermission(id ,cb){
    setTimeout(() => {
        cb(["read", "write", "delete"])
    }, 2000)
}
function loadDashboard(permission, cb){
    setTimeout(() => {
        cb();
    }, 2000);
}

loginUser("Akshat",function(){
    fetchPermission(userdata.id, function(permission){
        loadDashboard(permission, function(){
            console.log("Permission Loaded")
        })
    })
})
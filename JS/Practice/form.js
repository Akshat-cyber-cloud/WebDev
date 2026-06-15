const userData = {
    name: "Akshat",
    email: "akshat@gmail.com",
    password: "password123",
    age:22
};

function validateName(name){
    return name.trim().length > 0;
}

function validateEmail(email){
    return email.includes("@");
}

function validatePassword(password){
    return password.length >= 8;
}

function validateAge(age){
    return Number.isInteger(age) && age >= 18;
}

const users = [];

function registerUser(user){
    if(!validateName(user.name)){
        return "Invalid Name";
    }

    if(!validateEmail(user.email)){
        return "Invalid Email";
    }

    if(!validateAge(user.age)){
        return "Age must be 18";
    }

    if(!validatePassword(user.password)){
        return "Password too short";
    }

    
    const existingUser = users.find(
        u => u.email === user.email
    );
    
    if(existingUser){
        return "Email Already Exists";
    }
    users.push(user);
    
    return "User Registered";
}

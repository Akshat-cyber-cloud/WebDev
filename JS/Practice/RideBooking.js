// STORAGE
const users = [];
const rides = [];
const bookings = [];

let nextUserId = 1;
let nextRideId = 1;

// Register users

function registerUser(name, email) {

    if (!name.trim()) {
        return "Name is required";
    }

    const existingUser = users.find(
        user => user.email === email
    );

    if (existingUser) {
        return "Email already exists";
    }

    const user = {
        id: nextUserId++,
        name,
        email
    };

    users.push(user);

    return user;
}

// Add rides

function addRide(from, to, seats, fare) {

    if (seats <= 0) {
        return "Invalid seats";
    }

    if (fare < 0) {
        return "Invalid fare";
    }

    const ride = {
        id: nextRideId++,
        from,
        to,
        seats,
        fare
    };

    rides.push(ride);

    return ride;
}

// Available rides 

function searchRides(from, to) {

    return rides.filter(ride =>

        ride.from.toLowerCase() === from.toLowerCase() &&

        ride.to.toLowerCase() === to.toLowerCase()
    );
}

// Book Rides

function bookRide(userId, rideId) {

    const user = users.find(
        user => user.id === userId
    );

    if (!user) {
        return "User not found";
    }

    const ride = rides.find(
        ride => ride.id === rideId
    );

    if (!ride) {
        return "Ride not found";
    }

    if (ride.seats === 0) {
        return "No seats available";
    }

    const alreadyBooked = bookings.some(

        booking =>

            booking.userId === userId &&

            booking.rideId === rideId
    );

    if (alreadyBooked) {
        return "Already booked";
    }

    const booking = {
        id: nextBookingId++,
        userId,
        rideId,
        status: "confirmed"
    };

    bookings.push(booking);

    ride.seats--;

    return booking;
}



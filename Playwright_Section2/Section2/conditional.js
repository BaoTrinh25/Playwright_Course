let isLoggedIn = true;
let role = "admin";

if (isLoggedIn && role === "admin") {
    console.log("Access granted to admin panel.");
} else if (isLoggedIn && role === "user") {
    console.log("Access granted to user dashboard.");
} else {
    console.log("Please log in to access.");
}


var hour = 5
if (hour >= 6 && hour <= 11) {
    console.log("morning");
} else if (hour >= 12 && hour <= 17) {
    console.log("afternoon");
} else {
    console.log("evening");
}
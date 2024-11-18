// Declare initial variables
let familySize = 2;
let plannedDistanceToDrive = 100;

function recommendedCar(familySize, plannedDistanceToDrive) {
    // Requirement 1: If familySize is four or less and planned distance is less than 200
    if (familySize <= 4 && plannedDistanceToDrive < 200) {
        return "Tesla";
    }
    // Requirement 2: If familySize is four or less and planned distance is 200 or more
    else if (familySize <= 4 && plannedDistanceToDrive >= 200) {
        return "Toyota Camry";
    }
    // Requirement 3: If familySize is more than four
    else if (familySize > 4) {
        return "Minivan";
    }
}
/*
Tính số Test Case
- với familySize có 3 giá trị là 3,4,5 vì điều kiện đưa ra là >4 và <= 4
- planneDistanceToDrive có 3 giá trị là 199, 200, 201 vì điều kiện đưa ra là < 200 và >= 200
==> vì vậy ta có số Test Case là 3^2 = 9 TC
*/
// Test cases
const testCases = [
    { familySize: 3, plannedDistanceToDrive: 199 }, // Tesla
    { familySize: 3, plannedDistanceToDrive: 200 }, // Toyota Camry
    { familySize: 3, plannedDistanceToDrive: 201 }, // Toyota Camry
    { familySize: 4, plannedDistanceToDrive: 199 }, // Tesla
    { familySize: 4, plannedDistanceToDrive: 200 }, // Toyota Camry
    { familySize: 4, plannedDistanceToDrive: 201 }, // Toyota Camry
    { familySize: 5, plannedDistanceToDrive: 199 }, // Minivan
    { familySize: 5, plannedDistanceToDrive: 200 }, // Minivan
    { familySize: 5, plannedDistanceToDrive: 201 }, // Minivan
];

// Run test cases
testCases.forEach((testCase, index) => {
    const { familySize, plannedDistanceToDrive } = testCase;
    console.log(
        `Test Case ${index + 1}: 
        familySize=${familySize}, 
        plannedDistanceToDrive=${plannedDistanceToDrive} 
        => Recommended Car: ${recommendedCar(
            familySize,
            plannedDistanceToDrive
        )}`
    );
});

//vd1
let isMember = true;
let hasCoupon = true;

if (isMember && hasCoupon) {
    console.log("You get a discount!"); 
} else {
    console.log("No discount available.");
}
//vd2
let isWeekend = false;
let isHoliday = true;

if (isWeekend || isHoliday) {
    console.log("You have a day off!");
} else {
    console.log("You have to work.");
}
//vd3
var isStudent = true
var ageIsMoreThanTwenty = false
var i_a = isStudent && ageIsMoreThanTwenty
console.log(i_a);

//vd4
var isStudent = true
var ageIsMoreThanTwenty = false
var i_a = isStudent || ageIsMoreThanTwenty
console.log(i_a);

//vd5
console.log("test", !true);

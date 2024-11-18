//vd1
for(let i = 0; i < 5; i++) {
    console.log("loop thứ " + i);
}
console.log("#############");

//vd2 dùng for in
let QC = {
    firstname: "Trinh",
    lastname: "Bao",
    age: 25
};

for(let key in QC) {
    console.log(key + ": " + QC[key]);   
}

console.log("#############");

//vd3 for of
let fruits = ["apple", "banana", "cherry"];

for (let fruit of fruits) {
    console.log(fruit);
    if(fruit === "banana")
        break
}

fruits.forEach(fruits => {
    console.log("Use foreach: " + fruits);
    
})

console.log("#############");

//forEach
let QC1 = {
    firstname: "Trinh",
    lastname: "Bao",
    age: 25
};

Object.keys(QC1).forEach((key) => {
    console.log(key + ": " + QC1[key]);
});
let arr = [10, 20, 30, 40];
arr.forEach(function(num, index) {
    console.log("Index thứ " + index + ": " + num);
});
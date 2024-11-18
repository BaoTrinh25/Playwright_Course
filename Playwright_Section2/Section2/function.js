
import { printAge } from "../helpers/printHelper.js";
printAge(10); 

const a = 10;
const b = 20;
const num = 6;
// Ví dụ 1
function tinhtong(a, b) {
    return a + b;
}
console.log(`Tong cua ${a} và ${b} là: `, tinhtong(a, b)); 

// Ví dụ 2 arrow function
const tinhtong1 = (a, b) => a + b;
console.log(`Tong cua ${a} và ${b} khi dùng arrow function là: `, tinhtong1(a, b));

// Ví dụ 3
function multiplyByTwo(num) {
    return num * 2;
}
console.log(`${num} * 2 = `, multiplyByTwo(num)); 
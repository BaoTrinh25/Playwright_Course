/* TypeScript là một ngôn ngữ kiểu tĩnh, 
khi khai báo biến phải định nghĩa kiểu dữ liệu, 
và không được thay đổi,
nếu không chỉ định kiểu thì TS sẽ suy luận kiểu dữ liệu 
*/

var firstName: string = "Trinh"
var lastName: string = "Le"
var age: number = 18

type InfoPerson = {firstName: string, lastName: string, active: boolean}

var firstPerson: InfoPerson = {
    firstName: "Trinh",
    lastName: "Le",
    active: true
}

console.log("First Name:", firstName);
console.log("Last Name:", lastName);
console.log("Age:", age);
console.log("Person Info:", firstPerson);
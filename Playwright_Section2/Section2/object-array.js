var customer = {
    'first name': "Trinh",
    lastname: "Bao",
    cars: ["Ford", "Toyota", "Tesla"]
}
//dùng cho tên thuộc tính chứa khoảng trắng hoặc ký tự đặc biệt.
console.log("First Name: ",customer['first name']);

//không có khoảng trắng hoặc ký tự đặc biệt
console.log("Last Name: ", customer.lastname);

console.log("Full Name: " ,`${customer["first name"]} ${customer.lastname}`);

//truy cập phần tử thứ nhất của mảng carsS
console.log("Phần tử thứ nhất của mảng cars là: ",customer.cars[0]);

//gán giá trị BMW cho phần tử thứ nhất của mảng cars
customer.cars[0] = "BMW"
console.log("Giá trị phần tử thứ nhất sau khi gán giá trị mới là: ", customer.cars[0]);



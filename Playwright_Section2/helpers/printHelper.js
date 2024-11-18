export function printAge(age) {
    console.log("Số tuổi: ", age);
}

class CustomersDetail {
    firstName(firstname) {
        console.log(firstname);
    }
    lastName(lastname) {
        console.log(lastname);  
    }
}
export const customerDetail = new CustomersDetail;

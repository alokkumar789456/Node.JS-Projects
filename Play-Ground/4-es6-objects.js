//! objects and its properties
let name = 'Alok'
let age = 22
let user = {
    name,
    age,
    location: 'Blr'
}
console.log(user);


//! object destructuring 
const product = {
    label: 'red notebook',
    price: 3,
    stock:500,
    salePrice: undefined
}


//! in object destructuring you also give a default value while destructuring followed by '='
console.log(product);
const { label, price, stock, salesPrice=100 } = product
console.log(label);
console.log(price);
console.log(stock);
console.log(salesPrice);


//! default parameter use Case
const greet = (name='user')=>{
    console.log('hello ',name);
}
greet()
greet('Alok')


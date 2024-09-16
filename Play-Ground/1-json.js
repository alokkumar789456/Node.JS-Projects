const fs = require('fs')
let book = {
    name:'Rich Dad Poor Dad',
    author:'Robert KiyoSaki'
}
// console.log("object");
// console.log(book);
console.log("JSON Format");
let jsonObj = JSON.stringify(book)
// console.log(jsonObj);

console.log('write file');
console.log('storing json in json file by creating it');
fs.writeFileSync('1-json.json',jsonObj)

console.log('read file');
let readData = fs.readFileSync('1-json.json')
// console.log(readData);
// console.log(readData.toString());
        
console.log('json to js format');
let data = JSON.parse(readData)
// console.log(data.name);

console.log('data overwriting');
data.author = 'Robert Kiyosaki'
let JSONData = JSON.stringify(data)
// console.log(JSONData);

fs.writeFileSync('1-json.json',JSONData);
console.log('Data OverWritten');


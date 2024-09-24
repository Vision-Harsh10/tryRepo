const objectToString = {
    name : "Harsh Vardhan",
    age : 20
}
const json = JSON.stringify(objectToString);
console.log(json);

const jsonString = 
'{"name": "Harsh Vardhan", "age": 20 ,"city":"Moradabad"}';
const jsonObject = JSON.parse(jsonString);
console.log(jsonObject);
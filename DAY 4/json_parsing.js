let student = { 
    name: "Alice", 
    age: 22 
};

let jsonData = JSON.stringify(student);
console.log(jsonData);

let ObjectData = JSON.parse(jsonData);
console.log(ObjectData);
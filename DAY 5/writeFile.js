const fs = require('fs');
const student= "Name: Alice, Age: 22";
fs.writeFile('student.txt', student, (err) => {
    if(err){
        console.log(err);
        return;
    }
    console.log("File written successfully");
});
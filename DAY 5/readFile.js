const fs = require('fs');
fs.readFile('student.txt', 'utf8',(err,data)=>{
    if(err){
        console.error(err);
        return;
    }
    console.log("Student Data");
    console.log(data);
});
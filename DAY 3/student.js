function addStudent() {
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let course = document.getElementById("course").value;  

    if(name === "" || age === "" || course === "") {
        alert("Please fill in all fields");
    }
    else {
    let card = document.createElement("div");
    card.classList.add("student-card");
    card.innerHTML = `
        <h3>${name}</h3>
        <p>Age: ${age}</p>
        <p>Course: ${course}</p>
        <button onclick="editStudent(this)">Edit</button>
        <button onclick="deleteStudent(this)">Delete</button>
    `;

    document.getElementById("studentList").appendChild(card);
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("course").value = "";
    }
    
}


let students = JSON.parse(localStorage.getItem("students")) || [];

let editIndex = null;

const addBtn = document.getElementById("addBtn");

function saveToStorage() {
    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );
}

function updateStats() {

    document.getElementById(
        "totalStudents"
    ).innerText = students.length;

    const departments =
        [...new Set(students.map(s => s.department))];

    document.getElementById(
        "departmentCount"
    ).innerText = departments.length;
}

function displayStudents(data = students) {

    const container =
        document.getElementById("studentContainer");

    container.innerHTML = "";

    data.forEach((student,index)=>{

        const card =
            document.createElement("div");

        card.classList.add("card");

        card.innerHTML = `
            <h2>${student.name}</h2>

            <p><strong>Roll:</strong>
            ${student.roll}</p>

            <p><strong>Department:</strong>
            ${student.department}</p>

            <p><strong>Email:</strong>
            ${student.email}</p>

            <div class="buttons">

                <button
                    class="edit-btn"
                    onclick="editStudent(${index})">
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteStudent(${index})">
                    Delete
                </button>

            </div>
        `;

        container.appendChild(card);
    });

    updateStats();
}

function addStudent() {

    const name =
        document.getElementById("name").value.trim();

    const roll =
        document.getElementById("roll").value.trim();

    const department =
        document.getElementById("department").value.trim();

    const email =
        document.getElementById("email").value.trim();

    if(
        !name ||
        !roll ||
        !department ||
        !email
    ){
        alert("Please fill all fields");
        return;
    }

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailPattern.test(email)){
        alert("Enter valid email");
        return;
    }

    if(editIndex === null){

        const duplicate =
            students.some(
                student =>
                student.roll === roll
            );

        if(duplicate){
            alert("Roll Number already exists");
            return;
        }

        students.push({
            name,
            roll,
            department,
            email
        });

    }
    else{

        students[editIndex] = {
            name,
            roll,
            department,
            email
        };

        editIndex = null;

        addBtn.innerText =
            "Add Student";
    }

    saveToStorage();

    displayStudents();

    clearFields();
}

function editStudent(index){

    const student =
        students[index];

    document.getElementById("name").value =
        student.name;

    document.getElementById("roll").value =
        student.roll;

    document.getElementById("department").value =
        student.department;

    document.getElementById("email").value =
        student.email;

    editIndex = index;

    addBtn.innerText =
        "Update Student";
}

function deleteStudent(index){

    if(confirm(
        "Delete this student?"
    )){

        students.splice(index,1);

        saveToStorage();

        displayStudents();
    }
}

function clearFields(){

    document.getElementById("name").value="";
    document.getElementById("roll").value="";
    document.getElementById("department").value="";
    document.getElementById("email").value="";
}

addBtn.addEventListener(
    "click",
    addStudent
);

document.getElementById("search")
.addEventListener("keyup",function(){

    const value =
        this.value.toLowerCase();

    const filtered =
        students.filter(student=>

            student.name
            .toLowerCase()
            .includes(value)

            ||

            student.roll
            .toLowerCase()
            .includes(value)
        );

    displayStudents(filtered);
});

displayStudents();
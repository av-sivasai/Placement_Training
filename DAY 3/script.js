// function changeText() {
//     document.getElementById("title").innerHTML = "DOM changed!";
// }
// function showName() {
//     let name = document.getElementById("inputField").value;
//     document.getElementById("output").innerHTML = "Hello, " + name + "!";
// }

function addTask() {
    let taskInput = document.getElementById("task");
    let task = taskInput.value;

    if (task.trim() === "") {
        alert("Please enter a task");
        return;
    }

    // CREATE
    let li = document.createElement("li");

    let span = document.createElement("span");
    span.innerHTML = task;

    // UPDATE button
    let editBtn = document.createElement("button");
    editBtn.innerHTML = "Edit";
    editBtn.onclick = function () {
        let updatedTask = prompt("Edit task:", span.innerHTML);

        if (updatedTask !== null && updatedTask.trim() !== "") {
            span.innerHTML = updatedTask;
        }
    };

    // DELETE button
    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Delete";
    deleteBtn.onclick = function () {
        li.remove();
    };

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    document.getElementById("List").appendChild(li);

    taskInput.value = "";
}
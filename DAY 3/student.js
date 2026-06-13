let studentCount = 0;

function addStudent() {

    const name = document.getElementById("name").value.trim();
    const roll = document.getElementById("roll").value.trim();
    const department = document.getElementById("department").value.trim();
    const email = document.getElementById("email").value.trim();

    if (
        name === "" ||
        roll === "" ||
        department === "" ||
        email === ""
    ) {
        alert("Please fill all fields");
        return;
    }

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        alert("Enter valid email");
        return;
    }

    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <h3>${name}</h3>
        <p><strong>Roll No:</strong> ${roll}</p>
        <p><strong>Department:</strong> ${department}</p>
        <p><strong>Email:</strong> ${email}</p>

        <button class="delete-btn">
            Delete Student
        </button>
    `;

    card
    .querySelector(".delete-btn")
    .addEventListener("click", function () {

        card.remove();

        studentCount--;

        document.getElementById("count").textContent =
            studentCount;
    });

    document
    .getElementById("studentContainer")
    .appendChild(card);

    studentCount++;

    document.getElementById("count").textContent =
        studentCount;

    document.getElementById("name").value = "";
    document.getElementById("roll").value = "";
    document.getElementById("department").value = "";
    document.getElementById("email").value = "";
}
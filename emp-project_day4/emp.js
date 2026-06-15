// Load employees from localStorage
let employees = JSON.parse(localStorage.getItem("employees")) || [];

// Stores the ID of the employee being edited
let editId = null;

// Display employees when page loads
displayEmployees();

function addEmployee() {
    const name = document.getElementById("empName").value.trim();
    const age = document.getElementById("empAge").value;
    const department = document.getElementById("empDepartment").value;
    const salary = document.getElementById("empSalary").value;

    // Validation
    if (!name || !age || !department || !salary) {
        alert("Please fill all fields");
        return;
    }

    if (editId === null) {
        // Add new employee
        const employee = {
            id: Date.now(),
            name,
            age,
            department,
            salary
        };

        employees.push(employee);
    } else {
        // Update existing employee
        employees = employees.map(employee => {
            if (employee.id === editId) {
                return {
                    ...employee,
                    name,
                    age,
                    department,
                    salary
                };
            }
            return employee;
        });

        editId = null;
        document.getElementById("addBtn").textContent = "Add Employee";
    }

    localStorage.setItem("employees", JSON.stringify(employees));

    displayEmployees();
    clearFields();
}

function displayEmployees(filteredEmployees = employees) {
    const tableBody = document.getElementById("employeeTable");

    if (!tableBody) return;

    tableBody.innerHTML = "";

    if (filteredEmployees.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center;">
                    No employees found
                </td>
            </tr>
        `;
        return;
    }

    filteredEmployees.forEach(employee => {
        const row = `
            <tr>
                <td>${employee.id}</td>
                <td>${employee.name}</td>
                <td>${employee.age}</td>
                <td>${employee.department}</td>
                <td>₹${employee.salary}</td>
                <td>
                    <button onclick="editEmployee(${employee.id})">
                        Edit
                    </button>
                    <button onclick="deleteEmployee(${employee.id})">
                        Delete
                    </button>
                </td>
            </tr>
        `;

        tableBody.innerHTML += row;
    });
}

function editEmployee(id) {
    const employee = employees.find(emp => emp.id === id);

    if (!employee) return;

    document.getElementById("empName").value = employee.name;
    document.getElementById("empAge").value = employee.age;
    document.getElementById("empDepartment").value = employee.department;
    document.getElementById("empSalary").value = employee.salary;

    editId = id;

    document.getElementById("addBtn").textContent = "Update Employee";
}

function deleteEmployee(id) {
    const confirmDelete = confirm(
        "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) return;

    employees = employees.filter(employee => employee.id !== id);

    localStorage.setItem("employees", JSON.stringify(employees));

    // Reset form if deleted employee was being edited
    if (editId === id) {
        editId = null;
        clearFields();
        document.getElementById("addBtn").textContent = "Add Employee";
    }

    displayEmployees();
}

function searchEmployee() {
    const searchText = document
        .getElementById("search")
        .value
        .toLowerCase()
        .trim();

    const filteredEmployees = employees.filter(employee =>
        employee.name.toLowerCase().includes(searchText) ||
        employee.department.toLowerCase().includes(searchText)
    );

    displayEmployees(filteredEmployees);
}

function clearFields() {
    document.getElementById("empName").value = "";
    document.getElementById("empAge").value = "";
    document.getElementById("empDepartment").value = "";
    document.getElementById("empSalary").value = "";
}
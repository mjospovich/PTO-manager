//! Employees script

//* Function for fetchin API data for employee dropdown
async function fetchEmployees() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    
    const employees = [];

    // Object for each employee
    data.forEach(employee => {
      const employeeObject = {
        id: employee.id,
        name: employee.name,
        email: employee.email,
        ptos: []
      };

      // Then store it to array
      employees.push(employeeObject);
    });

    // Store the array to local storage
    localStorage.setItem("employees", JSON.stringify(employees));

    // For options in the dropdown
    const dropdown = document.getElementById("user_dropdown");
    employees.forEach((employee) => {
      const option = document.createElement("option");
      option.value = employee.id;
      option.textContent = employee.name;
      dropdown.appendChild(option);
    });
    
  } catch (error) {
    console.error(error);
  }
}


// Call fetch for employees
document.addEventListener("DOMContentLoaded", fetchEmployees);

const newPtoButton = document.querySelector("#new_pto");

newPtoButton.addEventListener("click", () => {
  let startDate = localStorage.getItem("startDate");
  let endDate = localStorage.getItem("endDate");
  let selectedUser = document.querySelector("#user_dropdown").value

  alert(startDate + ", " + endDate + " " + selectedUser)
});

//console.log(selectedUser, "  ", startDate, "  ", endDate);
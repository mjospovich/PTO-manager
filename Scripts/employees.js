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
    makeOptions();
    //makeContainers();

    
  } catch (error) {
    console.error(error);
  }
}


//* Function for generating options in the dropdown
function makeOptions(){
  const employees = JSON.parse(localStorage.getItem("employees"));
  const dropdown = document.getElementById("user_dropdown");
  employees.forEach((employee) => {
    const option = document.createElement("option");
    option.value = employee.id;
    option.textContent = employee.name;
    dropdown.appendChild(option);
  });
}

//* Function that creates empty employee containers
function makeContainers(){
  const employees = JSON.parse(localStorage.getItem("employees"));

  employees.forEach((employee) => {

    const id = employee.id;

    const profileContainer = document.createElement("div");
    profileContainer.classList.add("profile_container");
    profileContainer.id = "profile_container_" + id;
    
    const ptoContainer = document.createElement("div");
    ptoContainer.classList.add("pto_container");
    ptoContainer.id = "pto_container_" + id;

    const fullName = document.createElement("p");
    fullName.classList.add("fullname_par");
    fullName.textContent = employee.name;

    const email = document.createElement("p");
    email.classList.add("email_par");
    email.textContent = "email: " + employee.email;

    const hr = document.createElement("hr");

    profileContainer.appendChild(fullName);
    profileContainer.appendChild(email);
    profileContainer.appendChild(hr)
    profileContainer.appendChild(ptoContainer);

   profileContainer.style.display = "none";

    const main_page = document.querySelector(".main_page");
    main_page.appendChild(profileContainer);

  })

}

//* Function for creating new pto 
function newPto(){
  const newPtoButton = document.querySelector("#new_pto");

  newPtoButton.addEventListener("click", () => {
    let startDate = localStorage.getItem("startDate");
    let endDate = localStorage.getItem("endDate");
    let selectedUser = document.querySelector("#user_dropdown").value;
    const employees = JSON.parse(localStorage.getItem("employees"));
  
    //alert(startDate + ", " + endDate + " " + selectedUser)

    // Check if user has selected dates
    if (!startDate || !endDate){
      alert("You need to select start and end dates!");
      location.reload();
    }

    // Check if user selected an option in dropdown
    else if (!selectedUser){
      alert("You need to select the employee!");
      location.reload();
    }

    // Check if end date if prior to start date
    else if (startDate > endDate){
      alert("Start date needs to be prior to end date!")
      location.reload();
    }

    //alert(employees[selectedUser - 1].name);
    let pto = startDate + " - " + endDate;
    employees[selectedUser-1].ptos.push(pto);
    localStorage.setItem("employees", JSON.stringify(employees));

    // Reset local storage for dates
    localStorage.setItem("startDate", "");
    localStorage.setItem("endDate", "");
    location.reload();
  });

}


// Call fetch for employees for the first time
if (!localStorage.getItem("employees")){
  document.addEventListener("DOMContentLoaded", fetchEmployees);
}
// If already there just make optionst for dropdown
else{
  makeOptions();
  makeContainers();
}

// Call newPto listener
newPto();
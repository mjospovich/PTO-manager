//! Employees script

//* Image constants
const summer_img = "Assets/summer.jpg";
const spring_img = "Assets/spring.jpg";
const winter_img = "https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
const fall_img = "https://images.pexels.com/photos/688830/pexels-photo-688830.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";


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
    makeContainers();

    
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

    // The whole container that holds everything for one employee
    const profileContainer = document.createElement("div");
    profileContainer.classList.add("profile_container");
    profileContainer.id = "profile_container_" + id;
    
    // Here go all ptos of that employee
    const ptoContainer = document.createElement("div");
    ptoContainer.classList.add("pto_container");
    ptoContainer.id = "pto_container_" + id

    // Name on top of the profile container and the id
    const fullName = document.createElement("p");
    fullName.classList.add("fullname_par");
    fullName.textContent = employee.name + " (" + id + ")";

    // Mail below the name
    const email = document.createElement("p");
    email.classList.add("email_par");
    email.textContent = "email: " + employee.email;

    // Seperates info from pto container
    const hr = document.createElement("hr");

    // APpend all to big container
    profileContainer.appendChild(fullName);
    profileContainer.appendChild(email);
    profileContainer.appendChild(hr)
    profileContainer.appendChild(ptoContainer);

    // All hidden at starrt
    profileContainer.style.display = "none";

    // Added to seperate div 
    const pto_div = document.querySelector(".pto_div");
    pto_div.appendChild(profileContainer);

    if(employee.ptos.length != 0){

      profileContainer.style.display = "";

      employee.ptos.forEach((dates) =>{
        startDate = dates.split(" - ")[0];
        endDate = dates.split(" - ")[1];

        //alert(startDate + "  " + endDate);
        pto_create(startDate, endDate, id);
      })
    }

  })

}

//* Function that takes in info about new pto and creates it for that employee
function pto_create(start, end, id){
   
  const month = Number(start.slice(6,7));
  //alert(start.slice(6,7))
  const ptoContainer = document.getElementById("pto_container_" + id)
  //alert("#pto_container_" + id)
  
  let img = "";

  // Season determined by month for simplicity
  if([12, 1, 2].includes(month)){
    img = winter_img;
    //alert("winter" + id)
  }
  else if ([3, 4, 5].includes(month)){
    img = spring_img;
  }
  else if ([6, 7, 8].includes(month)){
    img = summer_img;
  }
  else if ([9, 10, 11].includes(month)){
    img = fall_img;
  }
  else{
    alert(start.slice(6,7));
    img = ":("
  }

  // Container for new pto that goes inside ptoContainer
  const new_pto_container = document.createElement("div");
  new_pto_container.classList.add("inner_pto");

  // Make image element and add source to it depending on season
  const imageElem = document.createElement("img");
  imageElem.classList.add("pto_image");
  imageElem.src = img;

  const pto_date = document.createElement("p");
  pto_date.textContent = start + " - " + end;

  //const del_pointer = document.createElement()

  //alert(img + pto_date.textContent)
  new_pto_container.appendChild(imageElem);
  new_pto_container.appendChild(pto_date);

  ptoContainer.appendChild(new_pto_container);

}


//* Function that responds to new pto button checks stuff and if all good calls pto_create 
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

    else{
      //alert(employees[selectedUser - 1].name);
      let pto = startDate + " - " + endDate;
      employees[selectedUser-1].ptos.push(pto);
      localStorage.setItem("employees", JSON.stringify(employees));

      // calls to create new pto
      makeContainers()
      //pto_create(startDate, endDate, selectedUser)
    }

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
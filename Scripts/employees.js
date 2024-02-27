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
        pto_past : [],
        pto_current: [],
        pto_future: []
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
    
    // Here go all past ptos of that employee
    const pastPtoContainer = document.createElement("div");
    pastPtoContainer.classList.add("past_pto_container");
    pastPtoContainer.id = "past_pto_container_" + id;

    // Here go all current ptos of that employee
    const currentPtoContainer = document.createElement("div");
    currentPtoContainer.classList.add("current_pto_container");
    currentPtoContainer.id = "current_pto_container_" + id;

    // Here go all future ptos of that employee
    const futurePtoContainer = document.createElement("div");
    futurePtoContainer.classList.add("future_pto_container");
    futurePtoContainer.id = "future_pto_container_" + id;

    // Holds name email and id
    const infoPtoContainer = document.createElement("div");
    infoPtoContainer.classList.add("info_pto_container");
    infoPtoContainer.id = "info_pto_container_" + id;

    // Name on top of the profile container and the id
    const fullName = document.createElement("p");
    fullName.classList.add("fullname_par");
    fullName.textContent = employee.name + " (" + id + ")";

    // Mail below the name
    const email = document.createElement("p");
    email.classList.add("email_par");
    email.textContent = "email: " + employee.email;

    // Text for past future and current ptos
    const past_p = document.createElement("p");
    past_p.textContent = "Past ptos:"
    const current_p = document.createElement("p");
    current_p.textContent = "Current ptos:"
    const future_p = document.createElement("p");
    future_p.textContent = "Future ptos:"

    // Append all to info container
    infoPtoContainer.appendChild(fullName);
    infoPtoContainer.appendChild(email);

    // Append to past current and fuiture pto containers
    pastPtoContainer.appendChild(past_p);
    currentPtoContainer.appendChild(current_p);
    futurePtoContainer.appendChild(future_p);

    // APpend all to big container
    profileContainer.appendChild(infoPtoContainer);
    profileContainer.appendChild(pastPtoContainer);
    profileContainer.appendChild(currentPtoContainer)
    profileContainer.appendChild(futurePtoContainer);

    // All hidden at starrt
    profileContainer.style.display = "none";
    pastPtoContainer.style.display = "none";
    currentPtoContainer.style.display = "none";
    futurePtoContainer.style.display = "none";

    // Added to seperate div 
    const pto_div = document.querySelector(".pto_div");
    pto_div.appendChild(profileContainer);

    // to know when not empty
    let len_past = employee.pto_past.length;
    let len_current = employee.pto_current.length;
    let len_future = employee.pto_future.length;

    if(len_past || len_current || len_future){

      // variables needed
      let sentPtoContainer = "";

      // show their profile container
      profileContainer.style.display = "";

      // only do show and create pto for one not empty
      if(len_past){
        pastPtoContainer.style.display = "";

        sentPtoContainer = pastPtoContainer;

        employee.pto_past.forEach((dates) =>{
          startDate = dates.split(" - ")[0];
          endDate = dates.split(" - ")[1];
  
          //alert(startDate + "  " + endDate);
          pto_create(startDate, endDate, id, sentPtoContainer);
        })

      }

      if (len_current){
        currentPtoContainer.style.display = "";

        sentPtoContainer = currentPtoContainer;

        employee.pto_current.forEach((dates) =>{
          startDate = dates.split(" - ")[0];
          endDate = dates.split(" - ")[1];
  
          //alert(startDate + "  " + endDate);
          pto_create(startDate, endDate, id, sentPtoContainer);
        })
      }

      if(len_future){
        futurePtoContainer.style.display = "";

        sentPtoContainer = futurePtoContainer;

        employee.pto_future.forEach((dates) =>{
          startDate = dates.split(" - ")[0];
          endDate = dates.split(" - ")[1];
  
          //alert(startDate + "  " + endDate);
          pto_create(startDate, endDate, id, sentPtoContainer);
        })
      }


    }

  })

}

//* Function that takes in info about new pto and creates it for that employee
function pto_create(start, end, id, ptoContainer){
   
  const month = Number(start.slice(6,7));
  //alert(start.slice(6,7))
  
  
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
  const newPtoContainer = document.createElement("div");
  newPtoContainer.classList.add("inner_pto");

  // Make image element and add source to it depending on season
  const imageElem = document.createElement("img");
  imageElem.classList.add("pto_image");
  imageElem.src = img;

  const ptoDate = document.createElement("p");
  ptoDate.textContent = start + " - " + end;

  const delPointer = document.createElement("i");
  delPointer.classList.add("fa");
  delPointer.classList.add("fa-times");
  delPointer.classList.add("del_pointer");

  //alert(img + ptoDate.textContent)
  newPtoContainer.appendChild(delPointer);
  newPtoContainer.appendChild(imageElem);
  newPtoContainer.appendChild(ptoDate);

  ptoContainer.appendChild(newPtoContainer);

}


//* Function that responds to new pto button checks stuff and if all good calls pto_create 
function newPto(){
  const newPtoButton = document.querySelector("#new_pto");
  const today = new Date().toISOString().split('T')[0];

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

      if(endDate < today){
        employees[selectedUser-1].pto_past.push(pto);
      }
      else if(endDate > today && startDate < today){
        employees[selectedUser-1].pto_current.push(pto);
      }
      else if(startDate > today){
        employees[selectedUser-1].pto_future.push(pto);
      }
      else{
        alert("smth weird");
      }
      

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
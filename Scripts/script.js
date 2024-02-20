//* Checking if logged in
const mainPage = document.querySelector(".main_page");
const loginButton = document.querySelector(".nav_button a");
const loginMsg = document.querySelector(".log_msg");

let isLoggedIn = document.cookie
  .split(";")
  .some((item) => item.trim().startsWith("userLoggedIn=True"));
  
// If user is logged in no blur, button is to log out, plus other stuff
if (isLoggedIn) {
  console.log("User is logged in.");
  mainPage.style.filter = "none";
  mainPage.style.pointerEvents = "auto";

  let name = document.cookie
    .split("; ")
    .find((row) => row.startsWith("name="))
    .split("=")[1];

  loginMsg.textContent = "Welcome, " + name + "!";

  loginButton.setAttribute("href", window.location.pathname);

  loginButton.addEventListener("click", function (event) {
    event.preventDefault();
    document.cookie = "userLoggedIn=; expires=01 Jan 1970; path=/;";
    window.location.reload();
  });
}

// If user isnt logged in set blur and button is for log in, plus other stuff
else {
  console.log("User is not logged in.");

  mainPage.style.filter = "blur(7px)";
  mainPage.style.pointerEvents = "none";

  loginMsg.textContent = "You are not logged in!";

  loginButton.setAttribute("href", "login.html");
}

//* Functions and variables for both calendars

months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let selectedDateStart;
let selectedDateEnd;

// Function that renders calendars
const renderCalendar = (calendar, year, month, daysTag, num) => {
  let firstDay = new Date(year, month, 1).getDay();
  let lastDate = new Date(year, month + 1, 0).getDate();
  let lastDay = new Date(year, month, lastDate).getDay();
  let lastDatePrev = new Date(year, month, 0).getDate();

  let tag = "";

  for (let i = firstDay; i > 0; i--) {
    tag += `<li class="other_month_${num}">${lastDate - i + 1}</li>`;
  }

  for (let i = 1; i <= lastDate; i++) {
    let today = i;

    const isSelectedStart =
      selectedDateStart &&
      selectedDateStart.getDate() === today &&
      selectedDateStart.getMonth() === month &&
      selectedDateStart.getFullYear() === year;
    const isSelectedEnd =
      selectedDateEnd &&
      selectedDateEnd.getDate() === today &&
      selectedDateEnd.getMonth() === month &&
      selectedDateEnd.getFullYear() === year;

    if (
      today === new Date().getDate() &&
      year === new Date().getFullYear() &&
      month === new Date().getMonth()
    ) {
      tag += `<li class="today${isSelectedStart ? " select_start" : ""}${
        isSelectedEnd ? " select_end" : ""
      }">${i}</li>`;
    } else {
      tag += `<li${isSelectedStart ? ' class="select_start"' : ""}${
        isSelectedEnd ? ' class="select_end"' : ""
      }>${i}</li>`;
    }
  }

  calendar.innerHTML = `${months[month]} ${year}`;
  daysTag.innerHTML = tag;

  daysTag.querySelectorAll("li").forEach((day) => {
    day.addEventListener("click", () => {
      const dayNumber = parseInt(day.textContent, 10);

      if (num == 1) {
        selectedDateStart = new Date(year, month, dayNumber);
        //alert(selectedDateStart);

        daysTag.querySelectorAll("li").forEach((day) => {
          day.classList.remove("select_start");
        });

        day.classList.add("select_start");
      } else if (num == 2) {
        selectedDateEnd = new Date(year, month, dayNumber);
        //alert(selectedDateEnd);

        daysTag.querySelectorAll("li").forEach((day) => {
          day.classList.remove("select_end");
        });

        day.classList.add("select_end");
      }
    });
  });
};

//* Script for first calendar
const currDate1 = document.querySelector(".current_date_1");
let daysTag1 = document.querySelector(".days_1");
let prevNextIcon1 = document.querySelectorAll(".icons_1 span");

let date1 = new Date();
let currYear1 = date1.getFullYear();
let currMonth1 = date1.getMonth();
//console.log(date, currYear, currMonth);

renderCalendar(currDate1, currYear1, currMonth1, daysTag1, 1);

prevNextIcon1.forEach((icon) => {
  icon.addEventListener("click", () => {
    currMonth1 = icon.id === "prev1" ? currMonth1 - 1 : currMonth1 + 1;

    if (currMonth1 < 0 || currMonth1 > 11) {
      date1 = new Date(currYear1, currMonth1);
      currYear1 = date1.getFullYear();
      currMonth1 = date1.getMonth();
    } else {
      date1 = new Date();
    }

    renderCalendar(currDate1, currYear1, currMonth1, daysTag1, 1);
  });
});

//* Script for second calendar
const currDate2 = document.querySelector(".current_date_2");
let daysTag2 = document.querySelector(".days_2");
let prevNextIcon2 = document.querySelectorAll(".icons_2 span");

let date2 = new Date();
let currYear2 = date2.getFullYear();
let currMonth2 = date2.getMonth();
//console.log(date, currYear, currMonth);

renderCalendar(currDate2, currYear2, currMonth2, daysTag2, 2);

prevNextIcon2.forEach((icon) => {
  icon.addEventListener("click", () => {
    currMonth2 = icon.id === "prev2" ? currMonth2 - 1 : currMonth2 + 1;

    if (currMonth2 < 0 || currMonth2 > 11) {
      date2 = new Date(currYear2, currMonth2);
      currYear2 = date2.getFullYear();
      currMonth2 = date2.getMonth();
    } else {
      date2 = new Date();
    }

    renderCalendar(currDate2, currYear2, currMonth2, daysTag2, 2);
  });
});

//* Fetchin API data for employee dropdown
document.addEventListener("DOMContentLoaded", function () {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((data) => {
      const dropdown = document.getElementById("user_dropdown");
      data.forEach((user) => {
        const option = document.createElement("option");
        option.value = user.id;
        option.textContent = user.name;
        dropdown.appendChild(option);
      });
    })

    .catch((error) => console.error(error));
});

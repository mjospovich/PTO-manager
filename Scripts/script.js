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

    if (
      today === new Date().getDate() &&
      year === new Date().getFullYear() &&
      month === new Date().getMonth()
    ) {
      tag += `<li class="today">${i}</li>`;
    } 
    else {
      tag += `<li>${i}</li>`;
    }
  }

  for (let i = lastDay; i < 6; i++) {
    tag += `<li class="other_month_${num}">${i - lastDay + 1}</li>`;
  }

  calendar.innerHTML = `${months[month]} ${year}`;
  daysTag.innerHTML = tag;
};

//* script for first calendar
const currentDate1 = document.querySelector(".current_date_1");
let daysTag1 = document.querySelector(".days_1");
let prevNextIcon1 = document.querySelectorAll(".icons_1 span");

let date1 = new Date();
let currYear1 = date1.getFullYear();
let currMonth1 = date1.getMonth();
//console.log(date, currYear, currMonth);

renderCalendar(currentDate1, currYear1, currMonth1, daysTag1, 1);

prevNextIcon1.forEach((icon) => {
  icon.addEventListener("click", () => {
    currMonth1 = icon.id === "prev1" ? currMonth1 - 1 : currMonth1 + 1;

    if(currMonth1 < 0 || currMonth1 > 11){
      date1 = new Date(currYear1, currMonth1);
      currYear1 = date1.getFullYear();
      currMonth1 = date1.getMonth();
    }
    else{
      date1 = new Date();
    }

    renderCalendar(currentDate1, currYear1, currMonth1, daysTag1, 1);
  });
});

//* script for second calendar
const currentDate2 = document.querySelector(".current_date_2");
let daysTag2 = document.querySelector(".days_2");
let prevNextIcon2 = document.querySelectorAll(".icons_2 span");

let date2 = new Date();
let currYear2 = date2.getFullYear();
let currMonth2 = date2.getMonth();
//console.log(date, currYear, currMonth);

renderCalendar(currentDate2, currYear2, currMonth2, daysTag2, 2);

prevNextIcon2.forEach((icon) => {
  icon.addEventListener("click", () => {
    currMonth2 = icon.id === "prev2" ? currMonth2 - 1 : currMonth2 + 1;

    if(currMonth2 < 0 || currMonth2 > 11){
      date2 = new Date(currYear2, currMonth2);
      currYear2 = date2.getFullYear();
      currMonth2 = date2.getMonth();
    }
    else{
      date2 = new Date();
    }

    renderCalendar(currentDate2, currYear2, currMonth2, daysTag2, 2);
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

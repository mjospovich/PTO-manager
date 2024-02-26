//! Calendar script

//* Functions and variables for both calendars
// All months array
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

// Global variables for start and end date
let selectedDateStart;
let selectedDateEnd;

// Function for formatting dates
function formatDate(year, month, dayNumber) {
  const formattedMonth = (month + 1).toString().padStart(2, "0");
  const formattedDay = dayNumber.toString().padStart(2, "0");

  return `${year}-${formattedMonth}-${formattedDay}`;
}

// Function that renders calendars
const renderCalendar = (calendar, year, month, daysTag, num) => {
  let firstDay = new Date(year, month, 1).getDay();
  let lastDate = new Date(year, month + 1, 0).getDate();
  let lastDay = new Date(year, month, lastDate).getDay();
  let lastDatePrev = new Date(year, month, 0).getDate();

  let tag = "";

  // Days from the previous month
  for (let i = lastDatePrev - firstDay + 1; i <= lastDatePrev; i++) {
    tag += `<li class="other_month_${num}" data-month="${month - 1}">${i}</li>`;
  }

  // Days for the current month
  for (let i = 1; i <= lastDate; i++) {
    let today = i;

    // Check for selected dates
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

    // To kkep track of what day is selected
    tag += `<li${isSelectedStart ? ' class="select_start"' : ""}${isSelectedEnd ? ' class="select_end"' : ""} data-month="${month}">${i}</li>`;
  }

  // Days from the next month
  for (let i = 1; i <= 6 - lastDay; i++) {
    tag += `<li class="other_month_${num}" data-month="${month + 1}">${i}</li>`;
  }

  // Updatin the calendar HTML
  calendar.innerHTML = `${months[month]} ${year}`;
  daysTag.innerHTML = tag;

  // Event listeners for selecting 
  daysTag.querySelectorAll("li").forEach((day) => {
    day.addEventListener("click", () => {
      const dayNumber = parseInt(day.textContent, 10);
      const selectedMonth = parseInt(day.getAttribute("data-month"), 10);

      // This is just for first calendar because start is on it
      if (num == 1) {
        selectedDateStart = new Date(year, selectedMonth, dayNumber);
        formattedStart = formatDate(year, selectedMonth, dayNumber); 

        localStorage.setItem("startDate", formattedStart);
        //alert(selectedDateStart)

        daysTag.querySelectorAll("li").forEach((day) => {
          day.classList.remove("select_start");
        });

        day.classList.add("select_start");


      // This is for second calendar cos there is the end day
      } else if (num == 2) {
        selectedDateEnd = new Date(year, selectedMonth, dayNumber);
        formattedEnd = formatDate(year, selectedMonth, dayNumber);

        localStorage.setItem("endDate", formattedEnd);
        //alert(selectedDateEnd)

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

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



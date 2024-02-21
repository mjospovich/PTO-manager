//! Employees script

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
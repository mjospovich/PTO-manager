//* Function that tests if password is valid
function isPasswordValid(password) {
  // Constants
  const minLength = 8;
  const specialChars = "!@#$%^&*()_+,./;:";

  // Flags
  let hasLower = false;
  let hasUpper = false;
  let hasNumber = false;
  let hasSpecial = false;

  // Chekck length
  if (password.length < minLength) {
    return false;
  }

  // Checking all flags
  for (let i = 0; i < password.length; i++) {
    const char = password[i];

    if (char >= "a" && char <= "z") {
      hasLower = true;
    }

    if (char >= "A" && char <= "Z") {
      hasUpper = true;
    }

    if (char >= "0" && char <= "9") {
      hasNumber = true;
    }

    if (specialChars.includes(char)) {
      hasSpecial = true;
    }
  }

  // If all flags are true then true, otherwise false
  const isValid = hasLower && hasNumber && hasUpper && hasSpecial;

  return isValid;
}

//* Function that checks if email is valid
function isEmailValid(email) {
  //constants
  const minLength = 5;
  const atIndex = email.indexOf("@");
  const dotIndex = email.indexOf(".", atIndex);

  //flags
  atValid = false;
  domainValid = false;

  // First chk if its even long enough
  if (email.length < minLength) {
    return false;
  }

  // Chk that @ exists and isnt the first char
  if (atIndex !== -1 && atIndex !== 0) {
    atValid = true;
  }

  // Chk that . exists and that it isnt right after @ and that it isnt the last char
  if (dotIndex !== -1 && dotIndex !== atIndex + 1 && dotIndex !== email.length - 1) {
    domainValid = true;
  }

  // If all flags are true retur true
  const emailValid = atValid && domainValid;

  return emailValid;
}

//* Function for login
function logInFunc(event) {
  event.preventDefault();

  const emailInput = document.querySelector("#email").value;
  const passInput = document.querySelector("#password").value;

  //alert("Email: " + emailInput + " Password: " + passInput);

  if (isEmailValid(emailInput) && isPasswordValid(passInput)) {
    //alert(emailInput.split("@")[0]);
    let name = emailInput.split("@")[0];
    document.cookie = "userLoggedIn=True;path=/;SameSite=Lax;expires=31 Dec 9999";
    document.cookie = "name=" + name + ";path=/;SameSite=Lax;expires=31 Dec 9999";
    window.location.href = "./index.html";
  } else {
    alert("Email or password not valid!");
  }
}

//* Getting stuff from form
const logInForm = document.querySelector(".login_form");

logInForm.addEventListener("submit", logInFunc);


// USING FORM ID

const form = document.querySelector('form');
const errorDisplay = document.querySelector('errorDisplay');

// You can place any text or HTML into errorDisplay

form.addEventListener('submit', function (event) {
  // clears previous errors and hide display

  errorDisplay.textContent = '';
  errorDisplay.style.display = 'none';



  //THE USER NAME CAN NOT BE BLANK


  let username = usernameInput.value.trim();
  let email = emailInput.value.trim();
  let password = passwordInput.value;
  let confirmPassword = confirmPasswordInput.value;

  const errors = [];


  // USERNAME VALIDATION


  if (!username) {
    errors.push("Username cannot be blank.");
  }

  if (username.length < 4) {
    errors.push("Username must be at least 4 characters long.");
  }

  // At least 2 unique characters
  const uniqueChars = new Set(username);
  if (uniqueChars.size < 2) {
    errors.push("Username must contain at least two unique characters.");
  }

  // No special chars or whitespace
  const usernameRegex = /^[a-zA-Z0-9]+$/;
  if (!usernameRegex.test(username)) {
    errors.push("Username cannot contain special characters or spaces.");
  }

  // Convert to lowercase for storage/comparison
  const usernameLower = username.toLowerCase();

  // Check uniqueness
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const usernameExists = users.some(
    (user) => user.username === usernameLower
  );

  if (usernameExists) {
    errors.push("That username is already taken.");
  }


  // EMAIL VALIDATION


  const emailLower = email.toLowerCase();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    errors.push("Email must be valid.");
  }

  if (emailLower.endsWith("@example.com")) {
    errors.push("Email domain 'example.com' is not allowed.");
  }


  // PASSWORD VALIDATION


  if (password.length < 12) {
    errors.push("Password must be at least 12 characters long.");
  }

  if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
    errors.push("Password must include uppercase and lowercase letters.");
  }

  if (!/[0-9]/.test(password)) {
    errors.push("Password must include at least one number.");
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push("Password must include at least one special character.");
  }

  if (/password/i.test(password)) {
    errors.push("Password cannot contain the word 'password'.");
  }

  if (password.toLowerCase().includes(usernameLower)) {
    errors.push("Password cannot contain the username.");
  }

  if (password !== confirmPassword) {
    errors.push("Passwords must match.");
  }


  // TERMS VALIDATION


  if (!termsInput.checked) {
    errors.push("You must accept the terms and conditions.");
  }


  // FINAL CHECK


  if (errors.length > 0) {
    alert(errors.join("\n"));
    return;
  }


  // STORE USER
  const newUser = {
    username: usernameLower,
    email: emailLower,
    password: password // (Note: In real apps, NEVER store plain passwords)
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  // SUCCESS

  form.reset();
  alert("Registration successful!");
});

const loginForm = document.querySelector("#loginForm");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Inputs
  const usernameInput = document.querySelector("#loginUsername");
  const passwordInput = document.querySelector("#loginPassword");
  const keepLoggedInInput = document.querySelector("#keepLoggedIn");

  let username = usernameInput.value.trim();
  let password = passwordInput.value;

  const errors = [];

  // PART--4--------- 
  // USERNAME VALIDATION

  if (!username) {
    errors.push("Username cannot be blank.");
  }

  const usernameLower = username.toLowerCase();

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const foundUser = users.find(
    (user) => user.username === usernameLower);

  if (username && !foundUser) {
    errors.push("Username does not exist.");
  }


  // PASSWORD VALIDATION

  if (!password) {
    errors.push("Password cannot be blank.");
  }

  if (foundUser && password !== foundUser.password) {
    errors.push("Incorrect password.");
  }


  // FINAL CHECK

  if (errors.length > 0) {
    alert(errors.join("\n"));
    return;
  }

  // SUCCESS

  loginForm.reset();

  if (keepLoggedInInput.checked) {
    alert(`Welcome back, ${usernameLower}! You will remain logged in.`);
  } else {
    alert(`Welcome back, ${usernameLower}!`);
  }
});
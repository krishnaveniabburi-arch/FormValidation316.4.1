 
 // using form ID

 const form = document.querySelector('form');
 const errorDisplay = document.getElementsById('errorDisplay');

 // You can place any text or HTML into errorDisplay

 form.addEventListener('submit', function(event) {
    // clears previous errors and hide display

    errorDisplay.textContent = '';
    errorDisplay.style.display = 'none';

    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');

//The username cannot be blank

  if(!username) {
    showError("user name can not be blank", 'username', event);
    return;
  }
  
//The username must be at least four characters long.

 if (username < 4) {
    showError("username must be atleast four characters long", 'username', event);
    return;
 }
//The username must contain at least two unique characters.

//The username cannot contain any special characters or whitespace.

 } )
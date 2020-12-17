//Modal Functions
    // Get the modal
var modal = document.getElementById("myModal");

    // Get the button that opens the modal
var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

    // When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

    // When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
    modal.style.display = "none";
    }
}

//Login function
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => 
{
  e.preventDefault();
  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;
  const type = loginForm['UserType'].value;
  // log the user in
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    console.log("User logged in successfully");
    if(type === 'Student')
    {
        window.location.href = "UserProfileStudent.html";
    }
    else if(type === 'CR')
    {
        window.location.href = "UserProfileCR.html";
    }
    else if(type === 'Faculty')
    {
        window.location.href = "UserProfileFaculty.html";
    }
    
  });

});




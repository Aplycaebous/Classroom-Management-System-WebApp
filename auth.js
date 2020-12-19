
const loginForm = document.querySelector('#login-form');

var email, password, type;

//Login function

loginForm.addEventListener('submit', (e) => 
{
  e.preventDefault();
  // get user info
    email = loginForm['login-email'].value;
    password = loginForm['login-password'].value;
    type = loginForm['UserType'].value;
    
  // log the user in
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    
    console.log("User logged in successfully using email and password");
    db.collection('User').where(firebase.firestore.FieldPath.documentId(), '==', email).get().then(snapshot =>
        {
            setupGuides(snapshot.docs, type);
            //console.log(snapshot.docs);
        });
    
    
  });


});
console.log(email);

const setupGuides = (data, inputType) => {
    data.forEach(doc => 
    {
        const userType = doc.data().Type;
    
        if(userType === 1 && inputType === 'Student')
        {
            console.log("User Logged In Successfully");
            window.location.href = "UserProfileStudent.html";
            
        }
        else if(userType === 2 && inputType === 'CR')
        {
            console.log("User Logged In Successfully");
            window.location.href = "UserProfileCR.html";
        }
        else if(userType === 3 && inputType === 'Faculty')
        {
            console.log("User Logged In Successfully");
            window.location.href = "UserProfileFaculty.html";
        }
        else
        {
            console.log(`Error: User is not a ${inputType}`);
        }
    });
};


//Setup Navbar 
auth.onAuthStateChanged(user => 
    {
        var email = user.email;
        db.collection('User').where(firebase.firestore.FieldPath.documentId(), '==', email).get().then(snapshot =>
        {
            setupNav(snapshot.docs);
        });
    }
)

const navContent = document.querySelector("#navContent");
const setupNav = (data) => 
{
    data.forEach(doc => 
    {
        const userType = doc.data().Type;
        if(userType === 1)
        {
            navContent.innerHTML = 
            `
                <a href="UserProfile.html" >User Profile</a>
                <a href="Routine.html">View Routine</a>
                <a class="active">Change Password</a> 
            `
        }
        else if(userType === 2)
        {
            navContent.innerHTML = 
            `
                <a href = "UserProfile.html">User Profile</a>
                <a href = "Routine.html">View Routine</a>
                <a href = "BookRoom.html">Book Room</a>
                <a href = "BookingRecords.html">Booking Records</a>
                <a class = "active">Change Password</a> 
            `
        }
        else if(userType === 3)
        {
            navContent.innerHTML = 
            `
                <a href = "UserProfile.html">User Profile</a>
                <a href = "BookRoom.html">Book Room</a>
                <a href = "BookingRecords.html">Booking Records</a>
                <a class = "active">Change Password</a> 
            `
        }
    });
};

//Logout
const logoutButton = document.querySelector('#logoutButton');

logoutButton.onclick = function()
{
    auth.signOut();
    console.log("User signed out successfully");
}

 
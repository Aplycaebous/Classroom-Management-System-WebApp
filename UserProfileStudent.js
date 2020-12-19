const userTable = document.querySelector('#profile-table');
//getting Email of Logged in User
auth.onAuthStateChanged(user => 
{
    var email = user.email;
    db.collection('User').where(firebase.firestore.FieldPath.documentId(), '==', email).get().then(snapshot =>
    {
        setupGuides(snapshot.docs, email);
    });
    
})

const setupGuides = (data, email) =>
{
    let html = ``;
    data.forEach(doc => 
    {
        const data = doc.data();
        const tableContent = 
        `
        <table>
            <thead>
                <tr class="table100-head">
                    <th class="column1">User Profile</th>
                    <th class="column2"></th>
                </tr>
            </thead>
            <tbody>
                    <tr>
                        <td class="column1">Student ID</td>
                        <td class="column2">${data.StudentID}</td>
                        
                    </tr>
                    <tr>
                        <td class="column1">Name</td>
                        <td class="column2">${data.Name}</td>
                        
                    </tr>
                    <tr>
                        <td class="column1">Email</td>
                        <td class="column2">${email}</td>
                        
                    </tr>
                    <tr>
                        <td class="column1">Department</td>
                        <td class="column2">${data.Department}</td>
                        
                    </tr>
                    <tr>
                        <td class="column1">Program</td>
                        <td class="column2">${data.Program}</td>
                        
                    </tr>
                    <tr>
                        <td class="column1">Section</td>
                        <td class="column2">${data.Section}</td>
                        
                    </tr>
                    <tr>
                        <td class="column1">Date Of Birth</td>
                        <td class="column2">${data.DateOfBirth}</td>
                        
                    </tr>
                    <tr>
                        <td class="column1">Batch</td>
                        <td class="column2">${data.Batch}</td>
                        
                    </tr>
                    
            </tbody>
		</table>
        `
        html += tableContent;
    });
    userTable.innerHTML = html;

}

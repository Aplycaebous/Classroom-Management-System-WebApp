const containerTable = document.querySelector('#containerTable');

listDept();

//Logout
const logoutButton = document.querySelector('#logoutButton');

logoutButton.onclick = function()
{
    auth.signOut();
    console.log("User signed out successfully");
}

function listDept()
{
    db.collection('Department').get().then(snapshot =>
        {
            var html = ``;
            const snapData = snapshot.docs;
            html +=
            `
            <div class="wrap-table100">
                <div class="table100">
                    <table>
                        <thead>
                            <tr class="table100-head">
                                
                                <th class="roomcolumn1">Code</th>
                                <th class="roomcolumn2">Short Form</th>
                                <th class="roomcolumn3">Full Name</th>
                                <th class="roomcolumn4">Faculty</th>
                                <th class="roomcolumn5">Established Year</th>
                                <th class="roomcolumn6" style="opacity:0">Delete</th>
                            </tr>
                        </thead>
                    <tbody id = "tableBody">
                    
            `
            snapData.forEach(doc =>
            {
                code = doc.id;
                
                data = doc.data();
                estYear = data.EstYear;
                faculty = data.Faculty;
                shortForm = data.Name;
                fullForm = data.FullForm;
                
                html +=
                `
                <tr>
                    <td class="roomcolumn1">${code}</td>
                    <td class="roomcolumn2">${shortForm}</td>
                    <td class="roomcolumn3">${fullForm}</td>
                    <td class="roomcolumn4">${faculty}</td>
                    <td class="roomcolumn5">${estYear}</td>
                    <td class="roomcolumn6">
                        <span value = "${doc.id}" class = "delete"> X </span>
                    </td>
                </tr>`
            })
            html +=
            `
            </tbody>
                </table>
            </div></br></br>
            <div id = "deleteMessage">
            </div>
            `
            containerTable.innerHTML = html;

            //Delete Building
            const closeButtons = document.getElementsByClassName("delete");
            for(i = 0; i<closeButtons.length; i++)
            {
                closeButtons[i].addEventListener("click", function() 
                {
                    //remove in UI
                    this.parentElement.parentElement.style.display = 'none';
                    //delete in Database
                    deleteID = this.getAttribute("value")
                    db.collection("Building").doc(deleteID).delete().then(function() 
                    {
                        const deleteMessage = document.querySelector('#deleteMessage');
                        deleteMessage.innerHTML = `<h6 style="color: rgb(180, 0, 0);
                                                            text-align: center;
                                                            font-size: 5;
                                                            ">
                                                    *Building Removed</h6>`
                    }).catch(function(error) {
                        console.error("Error removing document: ", error);
                    });
                    
                })
            }
        })
}
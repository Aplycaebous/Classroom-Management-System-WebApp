const containerTable = document.querySelector('#containerTable');

listProg();

//Logout
const logoutButton = document.querySelector('#logoutButton');

logoutButton.onclick = function()
{
    auth.signOut();
    console.log("User signed out successfully");
}

function listProg()
{
    db.collection('Program').get().then(snapshot =>
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
                                
                                <th class="roomcolumn1">Dept Code</th>
                                <th class="roomcolumn2">Program Code</th>
                                <th class="roomcolumn3">Short Form</th>
                                <th class="roomcolumn4">Full Name</th>
                                <th class="roomcolumn5">Offered From</th>
                                <th class="roomcolumn6" style="opacity:0">Delete</th>
                            </tr>
                        </thead>
                    <tbody id = "tableBody">
                    
            `
            snapData.forEach(doc =>
            {
                deptCode = doc.id[0];
                progCode = doc.id[2];
                data = doc.data();
                
                offeredFrom = doc.OfferedFrom
                shortForm = data.Name;
                fullForm = data.FullForm;
                
                html +=
                `
                <tr>
                    <td class="roomcolumn1">${deptCode}</td>
                    <td class="roomcolumn2">${progCode}</td>
                    <td class="roomcolumn3">${shortForm}</td>
                    <td class="roomcolumn4">${fullForm}</td>
                    <td class="roomcolumn5">${offeredFrom}</td>
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
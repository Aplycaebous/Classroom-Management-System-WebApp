const containerTable = document.querySelector('#containerTable');

listBuilding();

//Logout
const logoutButton = document.querySelector('#logoutButton');

logoutButton.onclick = function()
{
    db.collection('Admin').doc("currentAdmin").delete().then(
        function()
        {
            auth.signOut();
            console.log("User signed out successfully");
        }
    )
}

function listBuilding()
{
    db.collection('Building').get().then(snapshot =>
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
                                
                                <th class="column1">No</th>
                                <th class="buildingcolumn2">Building Name</th>
                                <th class="column3">Floors</th>
                                <th class="column4">Rooms</th>
                                <th class="column5">Lift</th>
                                <th class="column6">Established Year</th>
                                <th class="column7" style="opacity:0">Delete</th>
                            </tr>
                        </thead>
                    <tbody id = "tableBody">
                    
            `
            snapData.forEach(doc =>
            {
                buildingNo = doc.id;
                data = doc.data();
                
                var lift;
                liftBool = data.Lift;
                if(liftBool) lift = "Yes";
                else lift = "No";
                rooms = data.Rooms;
                floors= data.Floors;
                nameBuilding = data.Name;
                estYear = data.EstYear;
                
                html +=
                `
                <tr>
                    <td class="column1">${buildingNo}</td>
                    <td class="buildingcolumn2">${nameBuilding}</td>
                    <td class="column3">${floors}</td>
                    <td class="column4">${rooms}</td>
                    <td class="column5">${lift}</td>
                    <td class="column6">${estYear}</td>
                    <td class="column7">
                        <span value = "${buildingNo}" class = "delete"> X </span>
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
                console.log(closeButtons.length);
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
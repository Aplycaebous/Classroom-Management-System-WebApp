const containerTable = document.querySelector('#containerTable');

listRoom();

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

function listRoom()
{
    db.collection('Room').get().then(snapshot =>
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
                                
                                <th class="roomcolumn1">Building No</th>
                                <th class="roomcolumn2">Room No</th>
                                <th class="roomcolumn3">AC</th>
                                <th class="roomcolumn4">Projector</th>
                                <th class="roomcolumn5">Boards</th>
                                <th class="roomcolumn6">Capacity</th>
                                <th class="roomcolumn7" style="opacity:0">Delete</th>
                            </tr>
                        </thead>
                    <tbody id = "tableBody">
                    
            `
            snapData.forEach(doc =>
            {
                buildingNo = doc.id[0];
                roomNo = doc.id[2] + doc.id[3] + doc.id[4];
                data = doc.data();
                boards = data.Board;
                capacity = data.Capacity;
                
                var AC, projector;
                if(data.AC) AC = "Yes";
                else AC = "No";
                if(data.Projector) projector = "Yes";
                else projector = "No";
                
                html +=
                `
                <tr>
                    <td class="roomcolumn1">${buildingNo}</td>
                    <td class="roomcolumn2">${roomNo}</td>
                    <td class="roomcolumn3">${AC}</td>
                    <td class="roomcolumn4">${projector}</td>
                    <td class="roomcolumn5">${boards}</td>
                    <td class="roomcolumn6">${capacity}</td>
                    <td class="roomcolumn7">
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

            //Delete Room
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
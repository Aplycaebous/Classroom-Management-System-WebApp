
loadBuildingList();

//Fetch & Display Buildings List
const buildingList = document.querySelector("#BuildingNo");
function loadBuildingList()
{
    db.collection('Building').get().then(snapshot =>
    {
        var html = `<option value = "">Any</option>`;
        const data = snapshot.docs;
        data.forEach(doc => 
        {
            var content = `<option value = "${doc.id}">${doc.id}</option>`;
            html += content;
        })
        buildingList.innerHTML = html;
    });
}

//Search Rooms based on credentials

function searchRoom(building, AC, projector, board, capacity)
{
    db.collection("Room").where("AC","==", AC).where("Projector","==",projector).where("Board","==",Number(board)).where("Capacity",">=",Number(capacity)).get().then
    ( 
        snapshot =>
        {
            var roomIDList = [];
            const snapData = snapshot.docs;
            snapData.forEach(doc => 
            {
                if((building == "") || (building === doc.id.charAt(0)))
                { 
                    console.log(doc.id);
                   roomIDList.push(doc.id);
                }
            })
            //checks record
            //dispays roomlist                 
        }
    )
   
}



//Make Room List based on Room credentials 

const submitForm = document.querySelector("#submit-form");
submitForm.addEventListener('submit', (e) => 
{
    e.preventDefault();

    buildingNo = submitForm['BuildingNo'].value;
    capacity = submitForm['capacity'].value;
    AC = submitForm['AC'].checked;
    projector = submitForm['Projector'].checked;
    board = submitForm['Boards'].value;
    searchRoom(buildingNo, AC, projector, board, capacity);   
})



loadBuildingList();

//Fetch & Display Buildings List
const buildingList = document.querySelector("#BuildingNo");
function loadBuildingList()
{
    db.collection('Building').get().then(snapshot =>
    {
        var html = ``;
        const data = snapshot.docs;
        data.forEach(doc => 
        {
            var content = `<option value = "${doc.id}">${doc.id}</option>`;
            html += content;
        })
        buildingList.innerHTML = html;
    });
}

//Make Room List based on Room credentials 


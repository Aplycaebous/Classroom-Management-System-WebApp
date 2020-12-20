const routineTable = document.querySelector('#routine-table');
//getting Email of Logged in User


auth.onAuthStateChanged(user => 
{
    var email = user.email;
    db.collection('User').where(firebase.firestore.FieldPath.documentId(), '==', email).get().then(snapshot =>
    {
        console.log("hi");
        setRoutineTable(snapshot.docs, email);
    });
})


const setRoutineTable = (data, email) =>
{
    //fetch Routine ID
    var routineID;
    data.forEach(doc => 
    {
        const data = doc.data();
        routineID = data.Batch;
        routineID += "-";
        routineID += data.Section;
    })
    db.collection('Routine').where(firebase.firestore.FieldPath.documentId(), '==', routineID).get().then(snapshot =>
    {
        setupGuides(snapshot.docs, routineID);
    });
}

const setupGuides = (data, rID) =>
{
    console.log(rID);
    let html = ``;
    data.forEach(doc => 
    {
        const data = doc.data();
        console.log(data.Monday[1]);
        /*
        const tableContent = 
        `
        `
        html += tableContent;
        */
        
    });
    routineTable.innerHTML = html;
}

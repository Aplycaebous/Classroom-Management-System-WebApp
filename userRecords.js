const tableBody = document.querySelector("#tableBody");

auth.onAuthStateChanged(user => 
{
    var email = user.email;
    db.collection('Record').where('UserEmail','==',email).get().then(snapshot =>
    {
        var html = ``;
        const data = snapshot.docs;
        data.forEach(doc =>
        {
            recordID = doc.id;
            courseID = doc.data().CourseID;
            notes = doc.data().Notes;
            if(notes === "") notes = "None";
            routineID = doc.data().RoutineID;

            timeSlot = Number(recordID.charAt(17));
            time = convertTimeSlot(timeSlot);
            roomNo = recordID.substring(2,5);
            date = recordID.substring(6,16);

            html +=
            `
            <tr>
                <td class="column1">${recordID.charAt(0)}</td>
                <td class="column2">${roomNo}</td>
                <td class="column3">${date}</td>
                <td class="column4">${time[0]}</td>
                <td class="column5">${time[1]}</td>
                <td class="column6">${courseID}</td>
                <td class="column7">${routineID}</td>
                <td class="column8">${notes}</td>
            </tr>
            `
        })
        tableBody.innerHTML = html;
    })
})

function convertTimeSlot(slotNo)
{
    var out = [];
    if(slotNo === 1)
    {
        out[0] = "9:00 AM";
        out[1] = "9:50 AM";
    }
    else if(slotNo === 2)
    {
        out[0] = "10:00 AM";
        out[1] = "10:50 AM";
    }
    else if(slotNo === 3)
    {
        out[0] = "11:00 AM";
        out[1] = "11:50 AM";
    }
    else if(slotNo === 4)
    {
        out[0] = "12:00 PM";
        out[1] = "12:50 PM";
    }
    else if(slotNo === 5)
    {
        out[0] = "2:10 PM";
        out[1] = "3:00 PM";
    }
    else if(slotNo === 6)
    {
        out[0] = "3:10 PM";
        out[1] = "4:00 PM";
    }
    else if(slotNo === 7)
    {
        out[0] = "4:15 PM";
        out[1] = "5:05 PM";
    }
    else if(slotNo === 8)
    {
        out[0] = "5:15 PM";
        out[1] = "6:05 PM";
    }
    return out;
}
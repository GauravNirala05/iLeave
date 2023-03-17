async function approve(id,approval,refer){
    console.log(`its running`);
    try {
        const user = await fetch(`/approvals/${id}`, {
            method:'PATCH',
            body:JSON.stringify({
                refer:refer,
                approval:approval
            }),
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type':'application/json'
            }
        })
        if (!user.ok) {
            const{msg}=await user.json()
            throw Error(msg)
        }
        else{
            const data=await user.json()

            console.log(data)
        }
    } catch (error) {
        console.log(error);
    }
}
const getLeaveApprovals = async () => {
    try {
        const user = await fetch('/approvals', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if (!user.ok) {
            const userData = await user.json()
            throw Error(userData.msg)
        }

        const { data } = await user.json()

        if (data.profileCompleted == false) {
            complete_profile()
        }
        else {
            const { HOD, first, second, third, fourth } = data
            let num = 1
            const appliedTable = document.querySelector('.userAppliedTable')
            const defaultApprovingText = document.querySelector('#defaultApprovingText')
            defaultApprovingText.hidden = true
            console.log(HOD.hits, first.hits, second.hits, third.hits, fourth.hits)
            console.log(HOD.hod, first.firstYear, second.secondYear, third.thirdYear, fourth.fourthYear)
            HOD.hod.forEach(element => {
                var trHOD = document.createElement('tr')
                trHOD.style = `text-align: center;font-size: 25px;`
                trHOD.innerHTML = `<th>HOD</th>`
                appliedTable.append(trHOD)
                var fromDate = new Date(element.from_date).toDateString()
                var toDate = new Date(element.to_date).toDateString()
                var tr = document.createElement('tr')
                ihtml = `<td>${num}</td>
                <td >${element.employee_name}</td>
                <td >${element.leave_type}</td>
                <td >${fromDate}</td>
                <td >${toDate}</td>
                <td >${element.discription}</td>
                <td>
                    <span type="button" onclick="approve('${element._id}','true','1')" class="btn btn-outline-success mb-2 col-lg-11">Accept</span>
                    <span type="button" onclick="approve('${element._id}','false','1')" class="btn btn-outline-danger col-lg-11">Reject</span>
                </td>
                <td></td>`
                tr.innerHTML = ihtml
                appliedTable.append(tr)
                num++;
            });
            var trHOD = document.createElement('tr')
            trHOD.style = `text-align: center;font-size: 25px;`
            trHOD.innerHTML = `<th colspan="12">First Year</th>`
            appliedTable.append(trHOD)
            first.firstYear.forEach(element => {
                var fromDate = new Date(element.from_date).toDateString()
                var toDate = new Date(element.to_date).toDateString()
                var tr = document.createElement('tr')
                ihtml = `<td>${num}</td>
                <td >${element.employee_name}</td>
                <td >${element.leave_type}</td>
                <td >${fromDate}</td>
                <td >${toDate}</td>
                <td >${element.discription}</td>
                <td>
                    <span type="button" onclick="approve('${element._id}','true','1')" class="btn btn-outline-success mb-2 col-lg-11">Accept</span>
                    <span type="button" onclick="approve('${element._id}','false','1')" class="btn btn-outline-danger col-lg-11">Reject</span>
                </td>
                <td></td>`
                tr.innerHTML = ihtml
                appliedTable.append(tr)
                num++;
            });
            var trHOD = document.createElement('tr')
            trHOD.style = `text-align: center;font-size: 25px;`
            trHOD.innerHTML = `<th colspan="12">Second Year</th>`
            appliedTable.append(trHOD)
            second.secondYear.forEach(element => {
                var fromDate = new Date(element.from_date).toDateString()
                var toDate = new Date(element.to_date).toDateString()
                var tr = document.createElement('tr')
                ihtml = `<td>${num}</td>
                <td >${element.employee_name}</td>
                <td >${element.leave_type}</td>
                <td >${fromDate}</td>
                <td >${toDate}</td>
                <td >${element.discription}</td>
                <td>
                    <span type="button" onclick="approve('${element._id}','true','2')" class="btn btn-outline-success mb-2 col-lg-11">Accept</span>
                    <span type="button" onclick="approve('${element._id}','false','2')" class="btn btn-outline-danger col-lg-11">Reject</span>
                </td>
                <td></td>`
                tr.innerHTML = ihtml
                appliedTable.append(tr)
                num++;
            });
            var trHOD = document.createElement('tr')
            trHOD.style = `text-align: center;font-size: 25px;`
            trHOD.innerHTML = `<th colspan="12">Third Year</th>`
            appliedTable.append(trHOD)
            third.thirdYear.forEach(element => {
                var fromDate = new Date(element.from_date).toDateString()
                var toDate = new Date(element.to_date).toDateString()
                var tr = document.createElement('tr')
                ihtml = `<td>${num}</td>
                <td >${element.employee_name}</td>
                <td >${element.leave_type}</td>
                <td >${fromDate}</td>
                <td >${toDate}</td>
                <td >${element.discription}</td>
                <td>
                    <span type="button" onclick="approve('${element._id}','true','3')" class="btn btn-outline-success mb-2 col-lg-11">Accept</span>
                    <span type="button" onclick="approve('${element._id}','false','3')" class="btn btn-outline-danger col-lg-11">Reject</span>
                </td>
                <td></td>`
                tr.innerHTML = ihtml
                appliedTable.append(tr)
                num++;
            });
            var trHOD = document.createElement('tr')
            trHOD.style = `text-align: center;font-size: 25px;`
            trHOD.innerHTML = `<th colspan="12">Fourth Year</th>`
            appliedTable.append(trHOD)
            fourth.fourthYear.forEach(element => {
                var fromDate = new Date(element.from_date).toDateString()
                var toDate = new Date(element.to_date).toDateString()
                var tr = document.createElement('tr')
                ihtml = `<td>${num}</td>
                <td >${element.employee_name}</td>
                <td >${element.leave_type}</td>
                <td >${fromDate}</td>
                <td >${toDate}</td>
                <td >${element.discription}</td>
                <td>
                <span type="button" onclick="approve('${element._id}','true','4')" class="btn btn-outline-success mb-2 col-lg-11">Accept</span>
                <span type="button" onclick="approve('${element._id}','false','4')" class="btn btn-outline-danger col-lg-11">Reject</span>
            </td>
                <td></td>`
                tr.innerHTML = ihtml
                appliedTable.append(tr)
                num++;
            });
        }
    } catch (error) {
        console.log(error);
    }

}

const main = document.querySelector(".main-content")
const sidebar = document.querySelector(".sidebar")
const pop2 = document.querySelector("#popup2")
const f = document.querySelector("#logmsg")

if (token == null) {
    pop2.hidden = false
    main.hidden = true
    f.innerHTML = `You Need to Login First`
    sidebar.hidden = true
    openPopup2()
}
else {
    getLeaveApprovals()
}


function openPopup() {
    document.getElementById("popup").style.display = "block";
}

function openPopup2() {
    document.getElementById("popup2").style.display = "block";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

function confirm_logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('designation');
    location.replace("index.html")
}
function complete_profile() {
    location.replace("complete_profile.html")
}
function login() {
    location.replace("login.html")
}

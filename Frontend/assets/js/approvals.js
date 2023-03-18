
async function approveUser(id, approval, refer) {
    console.log(`its running`);
    try {
        const user = await fetch(`/approvals/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                refer: refer,
                approval: approval
            }),
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json'
            }
        })
        if (!user.ok) {
            const { msg } = await user.json()
            throw Error(msg)
        }
        else {
            const data = await user.json()

            console.log(data)

        }
    } catch (error) {
        console.log(error);
    }
}
var UserDesignation = localStorage.getItem('UserDesignation')
console.log(UserDesignation);
const getLeaveApprovals = async () => {
    try {
        const user = await fetch('/approvals', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if (!user.ok) {
            const status = user.status
            const { msg } = await user.json()
            var arraryError = []
            arraryError.push(status)
            arraryError.push(msg)
            errorHandler(arraryError)
            off()
        }
        else {
            const { hits, data } = await user.json()
            console.log(hits, data);
            const appliedTable = document.querySelector('.userAppliedTable')
            const defaultApprovingText = document.querySelector('#defaultApprovingText')
            defaultApprovingText.hidden = true
            if (hits == 0) {
                var trHOD = document.createElement('tr')
                trHOD.style = `text-align: center;font-size: 25px;`
                trHOD.innerHTML = `<th colspan="12">No Leaves Yet...</th>`
                appliedTable.append(trHOD)
            }
            else {
                if (UserDesignation == 'HOD') {
                    data.forEach(element => {
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
                            <span type="button" onclick="approveUserHOD('${element._id}','true')" class="btn btn-outline-success mb-2 col-lg-11">Accept</span>
                            <span type="button" onclick="approveUserHOD('${element._id}','false')" class="btn btn-outline-danger col-lg-11">Reject</span>
                        </td>
                        <td></td>`
                        tr.innerHTML = ihtml
                        appliedTable.append(tr)
                        num++;
                    });
                }
                if (UserDesignation == 'principal') {
                    data.forEach(element => {
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
                            <span type="button" onclick="approveUserPrincipal('${element._id}','true')" class="btn btn-outline-success mb-2 col-lg-11">Accept</span>
                            <span type="button" onclick="approveUserPrincipal('${element._id}','false')" class="btn btn-outline-danger col-lg-11">Reject</span>
                        </td>
                        <td>
                            <span type="button" onclick="approveUserPrincipal('${element._id}','true')" class="btn btn-outline-success mb-2 col-lg-11">Accept</span>
                            <span type="button" onclick="approveUserPrincipal('${element._id}','false')" class="btn btn-outline-danger col-lg-11">Reject</span>
                        </td>
                        <td></td>`
                        tr.innerHTML = ihtml
                        appliedTable.append(tr)
                        num++;
                    });
                }
                if (UserDesignation == 'faculty') {
                    const { HOD, first, second, third, fourth } = data
                    let num = 1
                    if (HOD.hits > 0) {

                        var trHOD = document.createElement('tr')
                        trHOD.style = `text-align: center;font-size: 25px;`
                        trHOD.innerHTML = `<th colspan="12">Hod</th>`
                        appliedTable.append(trHOD)
                        HOD.hod.forEach(element => {
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
                        <span type="button" onclick="approveUser('${element._id}','true','1')" class="btn btn-outline-success mb-2 col-lg-11">Accept</span>
                        <span type="button" onclick="approveUser('${element._id}','false','1')" class="btn btn-outline-danger col-lg-11">Reject</span>
                    </td>
                    <td></td>`
                            tr.innerHTML = ihtml
                            appliedTable.append(tr)
                            num++;
                        });
                    }
                    if (first.hits > 0) {

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
                        <span type="button" onclick="approveUser('${element._id}','true','1')" class="btn btn-outline-success mb-2 col-lg-11">Accept</span>
                        <span type="button" onclick="approveUser('${element._id}','false','1')" class="btn btn-outline-danger col-lg-11">Reject</span>
                    </td>
                    <td></td>`
                            tr.innerHTML = ihtml
                            appliedTable.append(tr)
                            num++;
                        });
                    }
                    if (second.hits > 0) {

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
                        <span type="button" onclick="approveUser('${element._id}','true','2')" class="btn btn-outline-success mb-2 col-lg-11">Accept</span>
                        <span type="button" onclick="approveUser('${element._id}','false','2')" class="btn btn-outline-danger col-lg-11">Reject</span>
                    </td>
                    <td></td>`
                            tr.innerHTML = ihtml
                            appliedTable.append(tr)
                            num++;
                        });
                    }
                    if (third.hits > 0) {

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
                        <span type="button" onclick="approveUser('${element._id}','true','3')" class="btn btn-outline-success mb-2 col-lg-11">Accept</span>
                        <span type="button" onclick="approveUser('${element._id}','false','3')" class="btn btn-outline-danger col-lg-11">Reject</span>
                    </td>
                    <td></td>`
                            tr.innerHTML = ihtml
                            appliedTable.append(tr)
                            num++;
                        });
                    }
                    if (fourth.hits > 0) {

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
                    <span type="button" onclick="approveUser('${element._id}','true','4')" class="btn btn-outline-success mb-2 col-lg-11">Accept</span>
                    <span type="button" onclick="approveUser('${element._id}','false','4')" class="btn btn-outline-danger col-lg-11">Reject</span>
                </td>
                    <td></td>`
                            tr.innerHTML = ihtml
                            appliedTable.append(tr)
                            num++;
                        });
                    }
                }
                off()
            }
        }
    }
    catch (error) {
        console.log(error);
        off()
    }

}

if (token) {
    getLeaveApprovals()
    off()

}

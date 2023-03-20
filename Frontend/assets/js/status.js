var content1 = document.getElementById("content-1");
var content2 = document.getElementById("content-2");
// var statusSwitch = document.getElementById("historycheckbox");
var historySwitch = document.getElementById("historycheckbox")

historySwitch.style.color = "blue"
content1.hidden = false
content2.hidden = true


function toggleContent() {
  if (content1.hidden == false) {
    content1.hidden = true
    content2.hidden = false
  }
  else{
    content1.hidden = false
    content2.hidden = true
  }
}

const getleavestatus = async () => {
  const stat = []
  stat.push('applied')
  console.log(stat);
  try {
    const user = await fetch('/leaveStatus', {
      method: 'POST',
      body: JSON.stringify({
        status: stat
      }),
      headers: {
        'Content-type': 'Application/json',
        'Authorization': `Bearer ${token}`
      },
    })

    if (!user.ok) {
      const userData = await user.json()
      throw Error(userData.msg)
    }
    const { data, hits } = await user.json()
    if (hits == 0) {
      const table = document.querySelector('#leavePending')
      table.innerHTML = `<tr style="text-align: center;font-size: 30px;font-weight: 100;">
      <th>No Leaves applied yet...</th>
      </tr>`
    }
    else {
      const pendingLeaveBody = document.querySelector('#pendingLeaveBody')
      const defaultPendingLeave = document.querySelector('#defaultPendingLeave')
      defaultPendingLeave.hidden = true
      let counter = 1
      data.forEach(element => {
        dateCreated = new Date(element.createdAt).toDateString()
        dateFrom = new Date(element.from_date).toDateString()
        dateTo = new Date(element.to_date).toDateString()
        var ihtml = ``
        var tr = document.createElement('tr')
        ihtml += `<td>${counter}</td>
        <td>${dateCreated}</td>
        <td>${element.leave_type}</td>
        <td>${dateFrom}</td>
        <td>${dateTo}</td>
        <td>${element.total_days}</td>`

        if (element.employee_dep == 'non-tech') {
          const pendingLeaveReference = document.querySelector('#pendingLeaveReference')
          pendingLeaveReference.hidden = true
          if (element.head_approval) {
            if (element.head_approval === true) {
              ihtml += `<i class="fa fa-check-circle-o " style="color: green;" aria-hidden="true"></i>`
            }
            if (element.head_approval === false) {
              ihtml += `<i class="fa fa-times-circle-o " style="color: red;" aria-hidden="true"></i>`
            }
          }
          else {
            ihtml += `<td>Pending</td>`
          }
          if (element.principal_approval) {
            if (element.principal_approval === true) {
              ihtml += `<i class="fa fa-check-circle-o " style="color: green;" aria-hidden="true"></i>`
            }
            if (element.principal_approval === false) {
              ihtml += `<i class="fa fa-times-circle-o " style="color: red;" aria-hidden="true"></i>`
            }
          }
          else {
            ihtml += `<td>Pending</td>`
          }
          ihtml += `<td>${element.status}</td>`
        }
        else {
          if (element.reference) {
            ihtml += `<td>${element.reference.name}`
            if (element.reference.approved === true) {
              ihtml += `<i class="fa fa-check-circle-o " style="color: green;" aria-hidden="true"></i>`
              ihtml += `</td>`
            }
            else if (element.reference.approved === false) {
              ihtml += `<i class="fa fa-times-circle-o " style="color: red;" aria-hidden="true"></i>`
              ihtml += `</td>`
            }
            else {
              ihtml += `<td>Pending</td>`
            }
          }
          else {
            ihtml += `<td><div>${element.reference1.name}`
            if (element.reference1.approved === true) {
              ihtml += `<i class="fa fa-check-circle-o " style="color: green;" aria-hidden="true"></i>`
            }
            if (element.reference1.approved === false) {
              ihtml += `<i class="fa fa-times-circle-o " style="color: red;" aria-hidden="true"></i>`
            }
            ihtml += `</div><div>${element.reference2.name}`
            if (element.reference2.approved === true) {
              ihtml += `<i class="fa fa-check-circle-o " style="color: green;" aria-hidden="true"></i>`
            }
            if (element.reference2.approved === false) {
              ihtml += `<i class="fa fa-times-circle-o " style="color: red;" aria-hidden="true"></i>`
            }
            ihtml += `</div>
            <div>${element.reference3.name}`
            if (element.reference3.approved === true) {
              ihtml += `<i class="fa fa-check-circle-o " style="color: green;" aria-hidden="true"></i>`
            }
            if (element.reference3.approved === false) {
              ihtml += `<i class="fa fa-times-circle-o " style="color: red;" aria-hidden="true"></i>`
            }
            ihtml += `</div>
          <div>${element.reference4.name}`
            if (element.reference4.approved === true) {
              ihtml += `<i class="fa fa-check-circle-o " style="color: green;" aria-hidden="true"></i>`
            }
            if (element.reference4.approved === false) {
              ihtml += `<i class="fa fa-times-circle-o " style="color: red;" aria-hidden="true"></i>`
            }
            ihtml += `</div></td>`
          }


          if (element.HOD_approval === true) {
            ihtml += `<i class="fa fa-check-circle-o " style="color: green;" aria-hidden="true"></i>`
          }
          else if ((element.HOD_approval === false)) {
            ihtml += `<i class="fa fa-times-circle-o " style="color: red;" aria-hidden="true"></i>`
          } else {
            ihtml += `<td>Pending</td>`
          }

          if (element.principal_approval) {
            if (element.principal_approval === true) {
              ihtml += `<td><i class="fa fa-check-circle-o " style="color: green;" aria-hidden="true"></i></td>`
            }
            else {
              ihtml += `<td><i class="fa fa-times-circle-o " style="color: red;" aria-hidden="true"></i></td>`
            }
          }
          else {
            ihtml += `<td>Pending</td>`
          }
          ihtml += `<td>${element.status}</td>`
          ihtml += `<td>
          <div onclick="deleteLeave('${element._id}')" class="btn btn-danger">
            <i class="fa fa-trash-o fa-lg"></i> Delete
          </div>
        </td>`
        }
        tr.innerHTML = ihtml
        pendingLeaveBody.append(tr)
        counter++
      });
    }
    off()
  } catch (error) {
    console.log(error);
  }
}
const getleaveHistory = async () => {
  try {
    const user = await fetch('/leaveHistory', {
      headers: {
        'Content-type': 'Application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    if (!user.ok) {
      const status = user.status
      const { msg } = await user.json()
      var arraryError = []
      arraryError.push(status)
      arraryError.push(msg)
      errorHandler(arraryError)
    }
    const { data, hits } = await user.json()
    if (hits == 0) {
      const table = document.querySelector('#leaveHistory')
      table.innerHTML = `<tr style="text-align: center;font-size: 30px;font-weight: 100;">
      <th>No Leaves applied yet...</th>
      </tr>`
    }
    else {
      const pendingLeaveBody = document.querySelector('#historyLeaveBody')
      const defaultPendingLeave = document.querySelector('#defaultHistoryLeave')
      defaultPendingLeave.hidden = true
      let counter = 1
      data.forEach(element => {
        dateCreated = new Date(element.createdAt).toDateString()
        dateFrom = new Date(element.from_date).toDateString()
        dateTo = new Date(element.to_date).toDateString()
        var ihtml = ``
        var tr = document.createElement('tr')
        ihtml += `<td>${counter}</td>
        <td>${dateCreated}</td>
        <td>${element.leave_type}</td>
        <td>${dateFrom}</td>
        <td>${dateTo}</td>
        <td>${element.total_days}</td>`

        if (element.employee_dep == 'non-tech') {
          const pendingLeaveReference = document.querySelector('#pendingLeaveReference')
          pendingLeaveReference.hidden = true
          if (element.head_approval) {
            if (element.head_approval === true) {
              ihtml += `<i class="fa fa-check-circle-o " style="color: green;" aria-hidden="true"></i>`
            }
            if (element.head_approval === false) {
              ihtml += `<i class="fa fa-times-circle-o " style="color: red;" aria-hidden="true"></i>`
            }
          }
          else {
            ihtml += `<td>Pending</td>`
          }
          if (element.principal_approval) {
            if (element.principal_approval === true) {
              ihtml += `<i class="fa fa-check-circle-o " style="color: green;" aria-hidden="true"></i>`
            }
            if (element.principal_approval === false) {
              ihtml += `<i class="fa fa-times-circle-o " style="color: red;" aria-hidden="true"></i>`
            }
          }
          else {
            ihtml += `<td>Pending</td>`
          }
          ihtml += `<td>${element.status}</td>`
        }
        else {
          if (element.reference) {
            ihtml += `<td>${element.reference.name}`
            if (element.reference.approved === true) {
              ihtml += `<i class="fa fa-check-circle-o " style="color: green;" aria-hidden="true"></i>`
              ihtml += `</td>`
            }
            if (element.reference.approved === false) {
              ihtml += `<i class="fa fa-times-circle-o " style="color: red;" aria-hidden="true"></i>`
              ihtml += `</td>`
            }
            else {
              ihtml += `<td>Pending</td>`
            }
          }
          else {
            ihtml += `<td><div>${element.reference1.name}`
            if (element.reference1.approved === true) {
              ihtml += `<i class="fa fa-check-circle-o " style="color: green;" aria-hidden="true"></i>`
            }
            if (element.reference1.approved === false) {
              ihtml += `<i class="fa fa-times-circle-o " style="color: red;" aria-hidden="true"></i>`
            }
            ihtml += `</div>
          <div>${element.reference2.name}`
            if (element.reference2.approved === true) {
              ihtml += `<i class="fa fa-check-circle-o " style="color: green;" aria-hidden="true"></i>`
            }
            if (element.reference2.approved === false) {
              ihtml += `<i class="fa fa-times-circle-o " style="color: red;" aria-hidden="true"></i>`
            }
            ihtml += `</div>
          <div>${element.reference3.name}`
            if (element.reference3.approved === true) {
              ihtml += `<i class="fa fa-check-circle-o " style="color: green;" aria-hidden="true"></i>`
            }
            if (element.reference3.approved === false) {
              ihtml += `<i class="fa fa-times-circle-o " style="color: red;" aria-hidden="true"></i>`
            }
            ihtml += `</div>
          <div>${element.reference4.name}`
            if (element.reference4.approved === true) {
              ihtml += `<i class="fa fa-check-circle-o " style="color: green;" aria-hidden="true"></i>`
            }
            if (element.reference4.approved === false) {
              ihtml += `<i class="fa fa-times-circle-o " style="color: red;" aria-hidden="true"></i>`
            }
            ihtml += `</div>
        </td>`
          }

          if (element.HOD_approval) {
            if (element.HOD_approval === true) {
              ihtml += `<td><i class="fa fa-check-circle-o " style="color: green;" aria-hidden="true"></i></td>`
            }
            if (element.HOD_approval === false) {
              ihtml += `<td><i class="fa fa-times-circle-o " style="color: red;" aria-hidden="true"></i></td>`
            }
          }
          else {
            ihtml += `<td>Pending</td>`
          }
          if (element.principal_approval) {
            if (element.principal_approval === true) {
              ihtml += `<td><i class="fa fa-check-circle-o " style="color: green;" aria-hidden="true"></i></td>`
            }
            if (element.principal_approval === false) {
              ihtml += `<td><i class="fa fa-times-circle-o " style="color: red;" aria-hidden="true"></i></td>`
            }
          }
          else {
            ihtml += `<td>Pending</td>`
          }
          ihtml += `<td>${element.status}</td>`
        }
        tr.innerHTML = ihtml
        pendingLeaveBody.append(tr)
        counter++
      });
      console.log(data)
    }
    off()


  } catch (error) {
    console.log(error);

  }

}
if (token == null) {
  pop2.hidden = false
  main.hidden = true
  f.innerHTML = `You Need to Login First`
  sidebar.hidden = true
  openPopup2()
}
else {
  getleavestatus()
  getleaveHistory()
}


function toggleDropdown() {
  var dropdown = document.getElementById("myDropdown");
  if (dropdown.style.display === "none") {
    dropdown.style.display = "block";
  } else {
    dropdown.style.display = "none";
  }
}



window.onload = function () {
  document.getElementById('loading-screen').style.display = 'block';
};
function off() {
  document.getElementById('loading-screen').style.display = 'none';
};

function tgl() {
  var t = document.getElementById("myBtn");
  if (t.value == "ON") {
    t.value = "OFF";
  }
  else if (t.value == "OFF") {
    t.value = "ON";
  }
}
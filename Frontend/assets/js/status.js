function errorHandler(msg) {

  document.getElementById("error_warn").innerHTML = `${msg[0]}`
  document.getElementById("error_msg").innerHTML = `${msg[1]}`
  openerrorPopup()

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
            ihtml += `<td>${element.head_approval}</td>`
          }
          else {
            ihtml += `<td>Pending</td>`
          }
          if (element.principal_approval) {
            ihtml += `<td>${element.principal_approval}</td>`
          }
          else {
            ihtml += `<td>Pending</td>`
          }
          ihtml += `<td>${element.status}</td>`
        }
        else {
          ihtml += `<td>
          <div>${element.reference1.name}</div>
          <div>${element.reference2.name}</div>
          <div>${element.reference3.name}</div>
          <div>${element.reference4.name}</div>
        </td>`
          if (element.head_approval) {
            ihtml += `<td>${element.head_approval}</td>`
          }
          else {
            ihtml += `<td>Pending</td>`
          }
          if (element.principal_approval) {
            ihtml += `<td>${element.principal_approval}</td>`
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
          const pendingLeaveReference = document.querySelector('#historyLeaveReference')
          pendingLeaveReference.hidden = true
          if (element.head_approval) {
            ihtml += `<td>${element.head_approval}</td>`
          }
          else {
            ihtml += `<td>Pending</td>`
          }
          if (element.principal_approval) {
            ihtml += `<td>${element.principal_approval}</td>`
          }
          else {
            ihtml += `<td>Pending</td>`
          }
          ihtml += `<td>${element.status}</td>`
        }
        else {
          ihtml += `<td>
          <div>${element.reference1.name}</div>
          <div>${element.reference2.name}</div>
          <div>${element.reference3.name}</div>
          <div>${element.reference4.name}</div>
        </td>`
          if (element.head_approval) {
            ihtml += `<td>${element.head_approval}</td>`
          }
          else {
            ihtml += `<td>Pending</td>`
          }
          if (element.principal_approval) {
            ihtml += `<td>${element.principal_approval}</td>`
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

var content1 = document.getElementById("content-1");
var content2 = document.getElementById("content-2");
var button1 = document.getElementById("toggle-button-1");
var button2 = document.getElementById("toggle-button-2");

content1.style.display = "block";
content2.style.display = "none";
button1.classList.add("active");


function toggleContentstatus() {
  content1.style.display = "block";
  content2.style.display = "none";
  button1.classList.add("active");
  button2.classList.remove("active");
}

  function toggleContenthistory() {
      content1.style.display = "none";
      content2.style.display = "block";
      button1.classList.remove("active");
      button2.classList.add("active");
  }
 
  



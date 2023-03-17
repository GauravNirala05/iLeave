const getuser = async () => {
  try {
    const user = await fetch('/getUserData', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    if (!user.ok) {
      const userData = await user.json()
      throw Error(userData.msg)
    }

    const { data } = await user.json()
    console.log(data)
    if (data.profileCompleted == false) {
      openmodal()
      
    }
    else {
      document.querySelector(".casual").innerHTML = data.leave_type.casual_leave
      document.querySelector(".earned").innerHTML = data.leave_type.earned_leave
      document.querySelector(".medical").innerHTML = data.leave_type.medical_leave
      document.querySelector(".ordinary").innerHTML = data.leave_type.ordinary_leave
      document.querySelector(".userName").innerHTML = data.name
      document.querySelector(".userDepartment").innerHTML = data.department
      document.querySelector(".userDesignation").innerHTML = data.designation
      document.querySelector(".userEmail").innerHTML = data.email
      document.querySelector(".userGreet").innerHTML = `Mr.`
    }
  } catch (error) {
    console.log(error);
  }

}
const getleavestatus = async () => {
  const stat = []
  stat.push('applied')
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
        dateCreated=new Date(element.createdAt).toDateString()
        dateFrom=new Date(element.from_date).toDateString()
        dateTo=new Date(element.to_date).toDateString()
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
        tr.innerHTML=ihtml
        pendingLeaveBody.append(tr)
        counter++
      });
      console.log(data)
    }

  } catch (error) {
    console.log(error);

  }

}


const main = document.querySelector(".main-content")
const sidebar = document.querySelector(".sidebar")
const foot = document.querySelector(".footer")
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
  getuser()
  getleavestatus()
}


function openmodal() {
  document.getElementById("popup3").style.display = "block";
}
function closePopup() {
  document.getElementById("popup3").style.display = "none";
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


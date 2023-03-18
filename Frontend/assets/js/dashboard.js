function errorHandler(msg) {

  document.getElementById("error_warn").innerHTML = `${msg[0]}`
  document.getElementById("error_msg").innerHTML = `${msg[1]}`
  openerrorPopup()

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
      
      const status = user.status
      const { msg } = await user.json()
      var arraryError = []
      arraryError.push(status)
      arraryError.push(msg)
      errorHandler(arraryError)
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

  } catch (error) {
    console.log(error);

  }

}
const getuser = async () => {
  try {
    const user = await fetch('/getUserData', {
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
    }
    else {
      const { data } = await user.json()
      document.querySelector(".casual").innerHTML = data.leave_type.casual_leave
      document.querySelector(".earned").innerHTML = data.leave_type.earned_leave
      document.querySelector(".medical").innerHTML = data.leave_type.medical_leave
      document.querySelector(".ordinary").innerHTML = data.leave_type.ordinary_leave
      getleavestatus()
      off()
    }
  }
  catch (error) {
    console.log(error);
  }
}
if (token) {
  getuser()
}



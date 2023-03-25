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
    console.log();
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
const alluserByPrincipal = async () => {
  try {
    const alluserdata = await fetch('/alluser', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    if (!alluserdata.ok) {
      const status = user.status
      const { msg } = await user.json()
      var arraryError = []
      arraryError.push(status)
      arraryError.push(msg)
      errorHandler(arraryError)
      off()
    }
    else {
      const { data } = await alluserdata.json()
      let num = 1
      tr = ``
      let data_user = ""
      data.forEach(element => {
        data_user += element;
        tr += `<tr>
        <td class="pl-4">${num}</td>
        <td>
          <h5 class="font-medium mb-0">${element.name}</h5>
        </td>
        <td>
          <span class="text-muted">${element.designation}</span><br>
          <span class="text-muted">${element.department}</span>
        </td>
        <td>
          <span class="text-muted">${element.email}</span>
        </td>
        <td>
          <span class="text-muted">${element.mob_no}</span>
        </td>
        <td>
          <button class="btn btn-outline-danger btn-circle btn-lg btn-circle ml-2"><i
              class="fa fa-edit"></i> </button>
          <button class="btn btn-outline-danger btn-circle btn-lg btn-circle ml-2"><i
              class="fa fa-trash"></i> </button>
        </td>
        </tr>`
        num += 1
      })
      const cs_user = document.querySelector('#csuserdetail')
      localStorage.setItem("alluserdetails", JSON.stringify(data))
      document.querySelector('#dephead').innerHTML = `All User`
      document.querySelector("#alluserdetail").innerHTML = tr
    }
  }
  catch (error) {
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
      off()
    }
    else {
      const { data } = await user.json()
      if (data.designation == "principal") {
        document.querySelector("#Leave-Balance").hidden = true
        document.querySelector("#Leave-Pending").hidden = true

        alluserByPrincipal()

        
        document.querySelector("#all-user").hidden = false
        document.querySelector("#headname").innerHTML = "All User"
      }
      else {
        document.querySelector(".casual").innerHTML = data.leave_type.casual_leave
        document.querySelector(".earned").innerHTML = data.leave_type.earned_leave
        document.querySelector(".medical").innerHTML = data.leave_type.medical_leave
        document.querySelector(".ordinary").innerHTML = data.leave_type.ordinary_leave
        getleavestatus()
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
  getuser()
  off()
}

function alluserdetailsbyDep(dep) {
  var alluserdetails = localStorage.getItem('alluserdetails');
  alluserdetail_DEP =  document.querySelector("#alluserdetail")
  alluserdetails = JSON.parse(alluserdetails)

  const dep_head = document.querySelector('#dephead')
  dep_head.innerHTML = dep

  tr = ``
  num = 0
  dep_head.scrollIntoView()

  alluserdetails.forEach(element => {
    if (element.department == dep) {
      num += 1
      tr += `<tr>
                  <td class="pl-4">${num}</td>
                  <td>
                    <h5 class="font-medium mb-0">${element.name}</h5>
                  </td>
                  <td>
                    <span class="text-muted">${element.designation}</span><br>
                    <span class="text-muted">${element.department}</span>
                  </td>
                  <td>
                    <span class="text-muted">${element.email}</span>
                  </td>
                  <td>
                    <span class="text-muted">${element.mob_no}</span>
                  </td>
                  <td>
                    <button class="btn btn-outline-danger btn-circle btn-lg btn-circle ml-2"><i
                        class="fa fa-edit"></i> </button>
                    <button class="btn btn-outline-danger btn-circle btn-lg btn-circle ml-2"><i
                        class="fa fa-trash"></i> </button>
                  </td>
                  </tr>`
    }
    else if(dep == 'All User'){
      alluserByPrincipal()
      return
    }
  })
  if (tr == ``) {
    alluserdetail_DEP.style = `text-align: center;font-size: 25px;`
    alluserdetail_DEP.innerHTML = `<th colspan="12">No Users Yet...</th>`
  } else {
    alluserdetail_DEP.innerHTML = tr
  }
}
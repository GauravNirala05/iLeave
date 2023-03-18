const token = localStorage.getItem('token')
function errorHandler(msg) {

  document.getElementById("error_warn").innerHTML = `${msg[0]}`
  document.getElementById("error_msg").innerHTML = `${msg[1]}`
  openerrorPopup()

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
    const { data } = await user.json()
    ihtml = `
        <div class="media align-items-end profile-head">
                        <div class="profile mr-3"><img src="images/profile.png" alt="..." width="130"
                                class="rounded mb-2 img-thumbnail">
                            <!-- <a href="#"
                                class="btn btn-outline-dark btn-sm btn-block">Edit profile</a> -->
                        </div>
                        <div class="media-body mb-5 text-white">
                            <p class="small mb-4" id="email" style="font-size:40px;"> <i class="fa fa-envelope "></i>  ${data.email}</p>
                        </div>
        </div>`
    document.getElementById("profile").innerHTML = ihtml
  } catch (error) {
    console.log(error);
  }
}
if (token == null) {
  alert(`You need to log in or authenticate to access this resource. Please click ok to log in or create an account.`)
  location.replace("login.html")
}
else {
  getuser()
}


const complete_profile = document.querySelector('.save')
const update_contact = document.querySelector('.phone_no')
const update_name = document.querySelector('#name')
const update_gender = document.querySelector('#gender')
const update_designation = document.querySelector('.designation')
const update_department = document.querySelector('.department')
const update_contract_type = document.querySelector('.contract_type')
complete_profile.addEventListener('click', async (e) => {
  e.preventDefault()

  const token = localStorage.getItem('token')

  const contact_no = update_contact.value
  const contract_type = update_contract_type.value
  const desig = update_designation.value
  const depart = update_department.value
  const name = update_name.value
  const gender = update_gender.value
  // const img = previewImage.value

  try {
    console.log(token);
    const fetcher = await fetch('/completeProfile', {
      method: 'PATCH',
      body: JSON.stringify({
        name: name,
        gender: gender,
        mob_no: contact_no,
        contect_type: contract_type,
        department: depart,
        designation: desig,
      }),
      headers: {
        'Content-Type': `application/json`,
        'Authorization': `Bearer ${token}`
      }
    })
    if (!fetcher.ok) {
      const status = fetcher.status
      console.log(status);
      const { msg, error } = await fetcher.json()
      console.log(msg);
      throw Error(`${status}`)
    }
    const { msg } = await fetcher.json()
    alert(`${msg}`)
    setTimeout(() => {
      location.replace("dashboard.html")
    }, 1000);
    console.log('completed profile')
    update_designation.value = ``
    update_department.value = ``
    update_contact.value = ``
    update_contract_type.value = ``

  } catch (error) {
    console.log(error)

  }
})

function openPopup() {
  document.getElementById("popup").style.display = "block";
}
function closePopup() {
  document.getElementById("popup").style.display = "none";
}



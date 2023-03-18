document.getElementById("contactForm").style.display = 'none'
document.getElementById("profileform").style.display = 'block'


const editProfile = document.querySelector(".editProfile")
const div = document.getElementById("profileform")
editProfile.addEventListener('click', () => {
  div.parentNode.removeChild(div);
  document.getElementById("contactForm").style.display = 'block'

});
const update_profile = document.querySelector('.update')
const update_contact = document.querySelector('.phone_no')
const update_email = document.querySelector('#emailOfUpdateProfile')
const update_name = document.querySelector('#name')
// const update_designation = document.querySelector('#Designation')
// const update_department = document.querySelector('#Department')
// const update_contract_type = document.querySelector('#Contract_type')
const update_designation = document.querySelector('.designation')
const update_department = document.querySelector('.department')
const update_contract_type = document.querySelector('.contract_type')

const userData = async () => {
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
      console.log(data)
      update_contact.placeholder = data.mob_no
      update_name.placeholder = data.name
      update_email.placeholder = data.email
      update_designation.placeholder = data.designation
      update_department.placeholder = data.department
      update_contract_type.placeholder = data.contect_type
      
      // document.getElementById('Designation').innerHTML=data.designation
      // document.getElementById('Department').innerHTML=data.department
      // document.getElementById('Contract_type').innerHTML=data.contect_type

      

    }
  } catch (error) {
    console.log(error);
  }
}
userData()

update_profile.addEventListener('click', async (e) => {
  e.preventDefault()
  const name = update_name.value
  const contact_no = update_contact.value
  const contract_type = update_contract_type.value
  const desig = update_designation.value
  const depart = update_department.value

  // const mob = mob_no.value
  // const pass = confirmPassword.value
  try {
    const fetcher = await fetch('/updateProfile', {
      method: 'PATCH',
      body: JSON.stringify({
        name: name,
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
      const { msg } = await fetcher.json()
      var arraryError = []
      arraryError.push(status)
      arraryError.push(msg)
      errorHandler(arraryError)
    }
    const { msg } = await fetcher.json()
    alert(`${msg}`)

    setTimeout(() => {
      location.replace("dashboard.html")
    }, 1000);
    console.log('updated profile')
  } catch (error) {
    console.log(error)
  }
})

const delete_account = document.querySelector('.delete')

delete_account.addEventListener('click', async (e) => {
  e.preventDefault()
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

    const {data} = await user.json()
    const userId = data._id
    console.log((userId));
    const deleteuser = await fetch(`/deleteProfile/${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    if (!deleteuser.ok) {
      const status = deleteuser.status
      const { msg } = await deleteuser.json()
      var arraryError = []
      arraryError.push(status)
      arraryError.push(msg)
      errorHandler(arraryError)
    }
    else {
      const data = await deleteuser.json()
      console.log(data);
    }

  } catch (error) {
    console.log(error);
  }
})
function openPopup() {
  main.hidden = true
  document.getElementById("popup").style.display = "block";
}
function closePopup() {
  main.hidden = false
  document.getElementById("popup").style.display = "none";
}

function openPopup() {
  document.getElementById("popup").style.display = "block";
}
function deletepopup() {
  document.getElementById("deletepopup").style.display = "block";
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
function login() {
  location.replace("login.html")
}

var loadFile = function (event) {
  var image = document.getElementById("output");
  image.src = URL.createObjectURL(event.target.files[0]);
};


function changepassword() {
  location.replace('changepassword.html')
}
window.onload = function () {
  document.getElementById('loading-screen').style.display = 'none';
};


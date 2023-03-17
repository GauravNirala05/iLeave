// const main = document.querySelector(".main-content")
// const sidebar = document.querySelector(".sidebar")

// var imageUpload = document.getElementById("image-upload");
// var previewImage = document.getElementById("preview-image");

// imageUpload.addEventListener("change", function() {
//   var file = this.files[0];
//   var reader = new FileReader();

//   reader.addEventListener("load", function() {
//     previewImage.src = reader.result;
//   });

//   if (file) {
//     reader.readAsDataURL(file);
//   }
// });


function openPopup() {
  main.hidden = true
  document.getElementById("popup").style.display = "block";
}
function closePopup() {
  main.hidden = false
  document.getElementById("popup").style.display = "none";
}
const update_profile = document.querySelector('.update')
const update_contact = document.querySelector('.phone_no')
const update_designation = document.querySelector('.designation')
const update_department = document.querySelector('.department')
const update_contract_type = document.querySelector('.contract_type')
// const confirmPassword = document.querySelector('.password')
const utoken = localStorage.getItem('token')
// console.log(localStorage)
if (utoken) {

  update_profile.addEventListener('click', async (e) => {
    e.preventDefault()
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

          mob_no: contact_no,
          contect_type: contract_type,
          department: depart,
          designation: desig,

          // password: pass
        }),
        headers: {
          'Content-Type': `application/json`,
          'Authorization': `Bearer ${utoken}`
        }
      })
      if (!fetcher.ok) {
        const status = fetcher.status
        console.log(status);
        const { msg, error } = await fetcher.json()
        console.log(msg);
        throw Error(`${status}`)
      }
      const { token, msg } = await fetcher.json()
      alert(`${msg}`)

      setTimeout(() => {
        location.replace("Dashboard.html")
      }, 1000);
      console.log('updated profile')
    } catch (error) {
      console.log(error)
    }
  })
}

const delete_account = document.querySelector('.delete')
const token = localStorage.getItem('token')
if (utoken) {

  delete_account.addEventListener('click', async (e) => {
    e.preventDefault()  

    try {

      const user = await fetch('/getUserData', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (!user.ok) {
        throw Error('something went wrong')
      }

      const userData = await user.json()
      console.log(userData.data._id)

      const deleteuser = await fetch('/deleteProfile/', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (!user.ok) {
        throw Error('something went wrong')
      }


    } catch (error) {
      console.log(error);
    }
  })
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

var loadFile = function (event) {
  var image = document.getElementById("output");
  image.src = URL.createObjectURL(event.target.files[0]);
};

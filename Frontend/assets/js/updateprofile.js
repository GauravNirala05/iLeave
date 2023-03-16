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

const getuser = async () => {
  const token = localStorage.getItem('token')
  if (token) {
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
      console.log(userData)
      let ihtml=``
      for(item in userData)
      {
        // console.log(userData);
        ihtml = `
        <div class=" user-wrapper ">
        <a class="btn  dropdown-toggle" style="border:none" type="button" id="dropdownMenuButton"
          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <img src="images/profile.jpg" width="40px" height="40px" alt="profile-img">
        </a>
        <div class="">
          <span>
            <h4 class="name mr-4">Prof.${userData.data.name}</h4>
          </span>

        </div>

        <div class="dropdown-menu text-center" aria-labelledby="dropdownMenuButton">
          <img src="images/profile.jpg" alt="John" class="mx-auto d-block" style="width:70px;height: 70px;">
          <div class="card-header" style="margin:10px">
          <div>
              <h4 class="fa fa-envelope" style="font-size: 20px;">&nbsp;&nbsp;${userData.data.email}</h4>
              <p class="title">${userData.data.designation}</p>
              <p>${userData.data.department}</p>
          </div>
          </div>
        </div>
      </div>`

      }
      document.getElementById("profile").innerHTML = ihtml
      document.getElementById("Name").innerHTML = `<input type="name" class="form-control Name" name="name" id="name" placeholder="Name" value="${userData.data.name}"
      aria-required="true" aria-invalid="true">`

      document.getElementById("email").innerHTML = `<input type="email" class="form-control Name" name="email" id="email" placeholder="Email" value="${userData.data.email}"
      aria-required="true" aria-invalid="true">`
    } catch (error) {
      console.log(error);
    }
  }
}
getuser()

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

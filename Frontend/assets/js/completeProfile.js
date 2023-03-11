const usertoken = localStorage.getItem('token');
if (usertoken==null){
  alert(`You need to log in or authenticate to access this resource. Please click ok to log in or create an account.`)
  location.replace("login.html")
}

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
      console.log(userData.data.designation)
      let ihtml=``
      for(item in userData)
      {
        // console.log(userData);
        ihtml=`
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
          <img src="images/profile.jpg" alt="John" style="width:70px;height: 70px;">
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
      document.getElementById("profile").innerHTML=ihtml
      document.getElementById("Name").innerHTML =`<input type="name" class="form-control Name" name="name" id="name" placeholder="Name" value="${userData.data.name}"
      aria-required="true" aria-invalid="true">`

      document.getElementById("email").innerHTML =`<input type="email" class="form-control Name" name="email" id="email" placeholder="Email" value="${userData.data.email}"
      aria-required="true" aria-invalid="true">`
      // document.getElementById("number").innerHTML = `<input type="number" class="form-control Name" name="mob_no" id="data" value="" placeholder="Full name"
      //                     aria-required="true" aria-invalid="true">`
      /*
            document.getElementById("Designation").innerHTML = `<select class="form-control" id="designation">
              <option name="reference3" value="">Designation</option>
              <option>Faculty</option>
              <option>HOD</option>
              <option>Pricipal</option>
            </select>`
      
            document.getElementById("Department").innerHTML = `<select class="form-control" id="department">
              <option name="reference3" value="">Department</option>
              <option value="Computer Science">CSE</option>
              <option value="Iformation Tecnology">HOD</option>
              <option value="ET & T">ET & T</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Civil">Civil</option>
              <option value="Mining">Mining</option>
            </select>`*/

    } catch (error) {
      console.log(error);
    }
  }
}
getuser()

function openPopup() {
  document.getElementById("popup").style.display = "block";
}
function closePopup() {
  document.getElementById("popup").style.display = "none";
}
const complete_profile = document.querySelector('.save')
const update_contact = document.querySelector('.phone_no')
const update_designation = document.querySelector('.designation')
const update_department = document.querySelector('.department')
const update_contract_type=document.querySelector('.contract_type')
// const confirmPassword = document.querySelector('.password')
const utoken = localStorage.getItem('token')
console.log(localStorage)
if (utoken) {
  
  complete_profile.addEventListener('click', async (e) => {
    e.preventDefault()
    const contact_no = update_contact.value
    const contract_type=update_contract_type.value
    const desig = update_designation.value
    const depart = update_department.value
    
    // const mob = mob_no.value
    // const pass = confirmPassword.value
    try {
      const fetcher = await fetch('/completeProfile', {
        method: 'PATCH',
        body: JSON.stringify({
         
          mob_no: contact_no,
          contect_type:contract_type,
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
        location.replace("Completeprofile.html")
      }, 1000);
      console.log('updated profile')
      update_designation.value = ``
      update_department.value = ``
      update_contact.value = ``
      update_contract_type.value=``
      // confirmPassword.value = ``
    } catch (error) {
      console.log(error)
     
    }
  })
}



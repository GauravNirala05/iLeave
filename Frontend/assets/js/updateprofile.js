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
      if (userData.data.designation == null) {

      }
      

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
const update_profile = document.querySelector('.save')
const update_contact = document.querySelector('.mob_no')
const update_designation = document.querySelector('.designation')
// const mob_no = document.querySelector('.mob_no')
const update_department = document.querySelector('.department')
const confirmPassword = document.querySelector('.password')
const token = localStorage.getItem('token')
console.log(localStorage)
if (token) {
  
  update_profile.addEventListener('click', async (e) => {
    e.preventDefault()
    const contact_no = update_contact.value
    const desig = update_designation.value
    const depart = update_department.value
    // const mob = mob_no.value
    const pass = confirmPassword.value
    try {
      const fetcher = await fetch('/updateProfile', {
        method: 'PATCH',
        body: JSON.stringify({
          mob_no: contact_no,
          designation: desig,
          department: depart,
          password: pass
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
      const { token, msg } = await fetcher.json()
      alert(`${msg}`)
      setTimeout(() => {
        location.replace("updateprofile.html")
      }, 1000);
      console.log('updated profile')
      update_contact.value = ``
      update_designation.value = ``
      update_department.value = ``
      confirmPassword.value = ``
    } catch (error) {
      console.log(error)
     
    }
  })
}



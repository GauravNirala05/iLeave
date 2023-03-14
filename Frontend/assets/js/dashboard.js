const main = document.querySelector(".main-content")
const sidebar = document.querySelector(".sidebar")
const foot = document.querySelector(".footer")

const getuser = async () => {
  const token = localStorage.getItem('token')
  if (token == null) {
    const pop2 = document.querySelector("#popup2")
    const f = document.querySelector("#fuck")
    pop2.hidden = false
    f.innerHTML = `You Need to Login First`
    main.hidden = true
    sidebar.hidden = true
    openPopup2()
    return
  }

  try {

    const user = await fetch('/getUserData', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    console.log(localStorage.getItem('token'))
    if (!user.ok) {
      const userData = await user.json()
      throw Error(userData.msg)
    }
    const userData = await user.json()
    console.log(userData)
    // console.log(userData.data.designation)
    if (userData.data.profileCompleted == false) {
      $(document).ready(function () {
        $("#myModal").modal('show');
      });
    }
    
    let ihtml = ``
    for (item in userData) {
      // console.log(userData);
      ihtml = `
        <div class="user-wrapper">
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
          <img src="images/profile.jpg" class="mx-auto d-block" alt="John" style="width:70px;height: 70px;">
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
    if(userData.data.department=='non-tech'){
      document.getElementById('All_ref_hide').style.display="none";
      // applyLeave_nontech()
      
    }
    else{
      if(userData.data.designation=='HOD'){
        document.getElementById('reference2').style.display="none";
        document.getElementById('reference3').style.display="none";
        document.getElementById('reference4').style.display="none";
        applyLeave_HOD()
      }
      if(userData.data.designation=='faculty'){
        applyLeave()
      }
    }

    let hodhtml = ``

    // once logic is implemeted it will be == insted of !=
    if (userData.data.designation != "HOD") {
      // console.log(userData.data.designation)

      hodhtml = `<div class="projects">
        <div class="card">
          <div class="card-header">
            <h2>On Leave</h2>
            <button>See all <span class="fa fa-arrow-down"></span> </button>
            <!--<button>See all <span class="fa fa-arrow-right"></span> </button>-->
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table width="100%">
                <thead>
                  <tr>
                    <td></td>
                    <td>Name</td>
                    <td>To-From</td>
                    <td>Department</td>
                    <td>Contact</td>


                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <i class="fa fa-check-circle" style="font-size:24px; margin-right:15px"></i>

                    </td>
                    <td style="text-transform:capitalize">Prof. Kunal Sharma</td>
                    <td>
                      <h6 class="text-dark text-left">25 Jul- 27 Jul</h6>
                    </td>
                    <td>Mining  </td>
                    <td>99999999  </td>
                    </tr>
                  <tr>
                    <td>
                      <i class="fa fa-check-circle" style="font-size:24px; margin-right:15px"></i>
                    </td>
                    <td>Prof. Surbhi Verma</td>
                    <td>
                      <h6 class="text-dark text-left">25 Jul- 27 Jul</h6>
                    </td>
                    <td>Civil </td>
                    <td>88888888 </td>

                  </tr>


                </tbody>

              </table>
            </div>

          </div>

        </div>

      </div>`
    }
    document.getElementById("only_auth").innerHTML = hodhtml


  } catch (error) {
    console.log(error);

  }

}
getuser()

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
  location.replace("index.html")
}
function complete_profile() {
  location.replace("complete_profile.html")
}
function login() {
  location.replace("login.html")
}
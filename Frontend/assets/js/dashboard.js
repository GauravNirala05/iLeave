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

    const userData = await user.json()

    if (userData.data.profileCompleted == false) {
      $(document).ready(function () {
        $("#myModal").modal('show');
      });
    }

    document.querySelector(".casual").innerHTML = userData.data.leave_type.casual_leave
    document.querySelector(".earned").innerHTML = userData.data.leave_type.earned_leave
    document.querySelector(".medical").innerHTML = userData.data.leave_type.medical_leave
    document.querySelector(".ordinary").innerHTML = userData.data.leave_type.ordinary_leave
  } catch (error) {
    console.log(error);
  }

}
const getleavestatus = async () => {
  const stat = []
  stat.push('applied')
  console.log(stat);
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
      console.log(`no leaves yet...`);
    }
    else {
      console.log(leaveData)
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

const token = localStorage.getItem('token')

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


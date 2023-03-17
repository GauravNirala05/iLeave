
const getLeaveApprovals = async () => {
    try {
        const user = await fetch('/approvals', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if (!user.ok) {
            const userData = await user.json()
            throw Error(userData.msg)
        }

        const { data } = await user.json()

        if (data.profileCompleted == false) {
            complete_profile()
        }
        else {
            console.log(data)
        }
    } catch (error) {
        console.log(error);
    }

}

const main = document.querySelector(".main-content")
const sidebar = document.querySelector(".sidebar")
const pop2 = document.querySelector("#popup2")
const f = document.querySelector("#logmsg")

if (token == null) {
    pop2.hidden = false
    main.hidden = true
    f.innerHTML = `You Need to Login First`
    sidebar.hidden = true
    openPopup2()
}
else {
    getLeaveApprovals()
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

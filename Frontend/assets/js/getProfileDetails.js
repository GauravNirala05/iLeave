const token = localStorage.getItem('token')
const main = document.querySelector(".main-content")
const sidebar = document.querySelector(".sidebar")
const pop2 = document.querySelector("#popup2")
const footer = document.querySelector(".footer")
const statusmsg = document.querySelector("#statuserror")
const errormsg = document.querySelector("#msgerror")


const errorHandler = (msg) => {
    document.getElementById("error_warn").innerHTML = `${msg[0]}`
    document.getElementById("error_msg").innerHTML = `${msg[1]}`
    openerrorPopup()
}
const getUserDetails = async () => {
    try {
        const user = await fetch('/getUserData', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if (!user.ok) {
            const status = user.status

            console.log(status);
            console.log(user.statusText);

            pop2.hidden = false
            main.hidden = true
            sidebar.hidden = true
            statusmsg.innerHTML = status
            errormsg.innerHTML = user.statusText
            openPopup2()
            localStorage.removeItem('token');
            document.getElementById('loading-screen').hidden = true;
            footer.style.opacity = "0";

            const { msg } = await user.json()
            var arraryError = []
            arraryError.push(status)
            arraryError.push(msg)
            errorHandler(arraryError)
        }
        else {
            const { data } = await user.json()
            if (data.profileCompleted == false) {
                openmodal()
            }
            else {
                const UserDesignation = data.designation
                console.log(UserDesignation);
                if (data.designation == 'principal') {
                    document.querySelector("#allusersidebar").hidden = false
                    document.querySelector("#applyleavesidebar").hidden = true
                    document.querySelector("#statussidebar").hidden = true
                }
                localStorage.setItem('UserDesignation', data.designation)
                document.querySelector(".userName").innerHTML = data.name
                document.querySelector(".userDepartment").innerHTML = data.department
                document.querySelector(".userDesignation").innerHTML = data.designation
                document.querySelector(".userEmail").innerHTML = data.email
                if (data.gender === 'male') {
                    document.querySelector(".userGreet").innerHTML = `Mr.`
                }
                if (data.gender === 'female') {
                    document.querySelector(".userGreet").innerHTML = `Miss.`
                }

                if (document.querySelector(".applyLeaveCasual")) {
                    document.querySelector(".applyLeaveCasual").innerHTML = data.leave_type.casual_leave
                    document.querySelector(".applyLeaveEarned").innerHTML = data.leave_type.earned_leave
                    document.querySelector(".applyLeaveMedical").innerHTML = data.leave_type.medical_leave
                    document.querySelector(".applyLeaveOrdinary").innerHTML = data.leave_type.ordinary_leave
                    document.querySelector(".applyLeaveTotal").innerHTML = data.leave_type.ordinary_leave + data.leave_type.medical_leave + data.leave_type.earned_leave + data.leave_type.casual_leave
                }

            }
        }
        off()
    } catch (error) {
        console.log(error);
        document.getElementById('loading-screen').hidden = true;
        off()
    }

}


if (token == null) {
    pop2.hidden = false
    main.hidden = true
    sidebar.hidden = true
    footer.style.opacity = "0";
    errormsg.innerHTML = `You Need to Login First`
    openPopup2()
    document.getElementById('loading-screen').hidden = true;

}
else {
    getUserDetails()
    off()
}

function openmodal() {
    document.getElementById("popup3").style.display = "block";
}
function closePopup() {
    document.getElementById("popup3").style.display = "none";
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
    localStorage.removeItem('UserDesignation');
    location.replace("index.html")
}
function complete_profile() {
    location.replace("complete_profile.html")
}
function login() {
    location.replace("login.html")
}

const error_popup = document.getElementById("popupError")
function openerrorPopup() {
    error_popup.classList.add("open-popup")
}
function closeerrorPopup() {
    error_popup.classList.remove("open-popup")
}

window.onload = function () {
    document.getElementById('loading-screen').style.display = 'block';
};
function off() {
    document.getElementById('loading-screen').style.display = 'none';

}

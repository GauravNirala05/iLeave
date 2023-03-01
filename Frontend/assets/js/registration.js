
const result = document.querySelector('.result')
const msg2 = document.querySelector('.msg')
const war_msg = document.querySelector('.war-msg')
const login_btn = document.querySelector('.login-btn')
const ok_btn = document.querySelector('.ok-btn')

const SamePass = document.querySelector('.SamePass')
const btn = document.querySelector('.submit-btn')
const input = document.querySelector('#name')
const idesignation = document.querySelector('#designation')
const imob_no = document.querySelector('#mob_no')
const idepartment = document.querySelector('#department')
const iemail = document.querySelector('#email')
const ipassword = document.querySelector('#password')
const iconpassword = document.querySelector('#Conpassword')

    // Get the modal
var modal = document.getElementById("myModal");    
var modal_err = document.getElementById("myModal-error");    

    // Get the <span> element that closes the modal
const span = document.querySelector('.close');

// When the user clicks on the button, open the modal
span.onclick = function() {
modal.style.display = "";
modal_err.style.display = "";
}


login_btn.onclick = function() {
    location.replace("login.html")
}

ok_btn.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
//     }

console.log(ipassword,iconpassword);
btn.addEventListener('click', async (e) => {
    e.preventDefault()
    if (ipassword.value == iconpassword.value) {
        SamePass.innerHTML = ``
        // const formAlert = document.querySelector('.form-alert')

        const nameValue = input.value
        const email = iemail.value
        const mob_no = imob_no.value
        const department = idepartment.value
        const designation = idesignation.value
        const password = ipassword.value
        try {
            const fetcher = await fetch('http://localhost:4000/registration', {
                method: 'POST',
                body: JSON.stringify({
                    name: nameValue,
                    email: email,
                    mob_no: mob_no,
                    department: department,
                    designation: designation,
                    password: password
                }),
                headers: {
                    'Content-Type': 'application/json'
                }

            })
            const { status, data, msg } = await fetcher.json()
            console.log(data, status, msg)
            result.innerHTML = `${status}, ${data._id}, ${msg} `
            if(status==="SUCCESS"){
                result.innerHTML = `Your Account have been Created`
                msg2.innerHTML = `${status}`
                modal.style.display = "block";
                
            }
            if(status==="FAILED"){
                result.innerHTML = `${msg}`
                war_msg.innerHTML = `${status}`
                modal.style.display = "block";
            }
        } catch (error) {
            // console.log(error.response)
            console.log(error.response)
        }

    }
    else {
        SamePass.innerHTML = `Password is not Matching`
    }
    
})
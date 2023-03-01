
const result = document.querySelector('.result')
const msg2 = document.querySelector('.msg')
const login_btn = document.querySelector('.login-btn')

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

    // Get the <span> element that closes the modal
const span = document.querySelector('.close');

// When the user clicks on the button, open the modal
span.onclick = function() {
modal.style.display = "";
}


login_btn.onclick = function() {
    location.replace("login.html")
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    }

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
            if(status=="SUCCESS"){
                result.innerHTML = `Your Account have been Created`
                msg2.innerHTML = `${status}`
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


btn_log.addEventListener('click', async (e) => {
    e.preventDefault()
    console.log('hits');
    const emaillog = email_log.value
    const passwordlog = password_log.value
    console.log(emaillog, passwordlog);

    const loger = await fetch('http://localhost:4000/login', {
        method: 'POST',
        body: JSON.stringify({
            email: emaillog,
            password: passwordlog
        }),
        headers: {
            'Content-Type': 'application/json'
        }

    })
    const DATA1 = await loger.json()
    console.log(DATA1)
    ihtml = `${DATA1.status}`
    if (DATA1.status === 'SUCCESS') {
        ihtml += `${DATA1.data.name}`
    }
    if (DATA1.status === 'FAILED') {
        ihtml += `${DATA1.msg}`
    }
    result.innerHTML = ihtml



})

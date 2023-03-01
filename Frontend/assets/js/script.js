const result = document.querySelector('.result')
const SamePass = document.querySelector('.SamePass')
const btn = document.querySelector('.submit-btn')
const input = document.querySelector('#name')
const idesignation = document.querySelector('#designation')
const imob_no = document.querySelector('#mob_no')
const idepartment = document.querySelector('#department')
const iemail = document.querySelector('#email')
const ipassword = document.querySelector('#password')
const iconpassword = document.querySelector('#Conpassword')

const btn_log = document.querySelector('.login-btn')
const email_log = document.querySelector('.email-log')
const password_log = document.querySelector('.password-log')

const alluser_btn = document.querySelector('.alluser')

btn.addEventListener('click', async (e) => {
    e.preventDefault()
    if (ipassword.value == iconpassword.value) {
        SamePass.innerHTML = ``
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
            if (status == "FAILED") {
                result.innerHTML = `${msg} `

            }
            else {
                result.innerHTML = `You have been registered ...<h1>${data.name}</h1>${data.department}`
            }
            if (status == "SUCCESS") {
                location.replace("login.html")
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

    const emaillog = email_log.value
    const passwordlog = password_log.value
    console.log(emaillog, passwordlog);
    ihtml = ``

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
    const user = await loger.json()
    const { status, msg, data } = user

    if (status === 'FAILED') {
        ihtml += `${msg}`
    }
    else {
        ihtml += `Hey ${data.name} you are successfully logged in....
        now you are have facilty to find other users <br>
        `
        alluser_btn.hidden=false
    }
    result.innerHTML = ihtml

    const id = data._id
    localStorage.setItem("id", id)
})



alluser_btn.addEventListener('click', async (e) => {
    ihtml = ``
    const id = localStorage.getItem("id")

    const alluser = await fetch(`/alluser/${id}`)

    const allusers = await alluser.json()
    console.log((allusers));

    const { status, msg, data } = allusers

    if (status == "FAILED") {
        ihtml = `${msg}`
    }
    else {
        data.forEach(element => {
            ihtml += `<h1>${element.name}</h1><br>
            <h5>${element.email}</h5><h5>${element.designation}</h5><h5>${element.department}</h5>`
        })
    }
    result.innerHTML = ihtml
})

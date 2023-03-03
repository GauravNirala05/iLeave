
const result = document.querySelector('.result')
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
            if (!fetcher.ok) {
                const { msg, error } = await fetcher.json()
                throw Error(fetcher.status + " " + error)
            }
            const { status, token, msg } = await fetcher.json()
            result.innerHTML = `${msg}`
            localStorage.setItem("token", token)
            location.replace("login.html")
            input.value = ``
            iemail.value = ``
            imob_no.value = ``
            idepartment.value = ``
            idesignation.value = ``
            ipassword.value = ``
        } catch (error) {
            console.log('Error===>', error)
        }

    }
    else {
        result.innerHTML = `Password is not Matching`
    }

})


btn_log.addEventListener('click', async (e) => {
    e.preventDefault()

    const emaillog = email_log.value
    const passwordlog = password_log.value
    console.log(emaillog, passwordlog);
    ihtml = ``
    try {

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
        if (!loger.ok) {
            const { msg } = loger.json()
            throw Error(msg + "  " + loger.status)
        }
        const { data, msg, token } = await loger.json()
        localStorage.setItem("token", token)

        ihtml += `Hey ${data.name} you are successfully logged in....
        now you are have facilty to find other users <br>
        ${msg}
        `
        result.innerHTML = ihtml
        alluser_btn.hidden = false
    }

    catch (error) {
        console.log(error)
    }
})



alluser_btn.addEventListener('click', async (e) => {
    try {
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
    } catch (error) {
        console.log(error.response.msg);
    }
})


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


console.log(ipassword, iconpassword);
btn.addEventListener('click', async (e) => {
    e.preventDefault()
    if (ipassword.value == iconpassword.value) {

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
            const h5 = document.createElement('span')
            h5.innerHTML = `${status}, ${data._id}, ${msg} `
            result.appendChild(h5)
        } catch (error) {
            // console.log(error.response)
            console.log(error.response)
        }

    }
    else {
        result.innerHTML = `<h1>provide same password</h1>`
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
    const user = DATA1.data._id
    console.log(user);
    document.cookie = `user=${user}`;
    result.innerHTML = ihtml

    localStorage.setItem("id",user)
})
console.log(document.cookie);
const cookieValue = document.cookie
  .split("; ")
  .find((row) => row.startsWith("user="))
  ?.split("=");

console.log(cookieValue);
const alluser_btn = document.querySelector('.alluser')

alluser_btn.addEventListener('click', async (e) => {
    console.log(`clicked`);
    ihtml=``
    const id=localStorage.getItem("id")

    const alluser = await fetch(`/alluser/${id}`)
    const allusers = await alluser.json()
    console.log((allusers));
    const{status,msg,data}=allusers
    if (status=="FAILED") {
        ihtml=`${msg}`
    }
    else{
        data.forEach(element => {
            ihtml+=`<h1>${element.name}</h1><br>
            <h5>${element.email}</h5><h5>${element.designation}</h5><h5>${element.department}</h5>`
        })
    }
    result.innerHTML=ihtml
})

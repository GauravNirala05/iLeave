const result = document.querySelector('.result')
const btn = document.querySelector('.submit-btn')
const input = document.querySelector('#name')
const idesignation = document.querySelector('#designation')
const imob_no = document.querySelector('#mob_no')
const idepartment = document.querySelector('#department')
const iemail = document.querySelector('#email')
const ipassword = document.querySelector('#password')

const btn_log = document.querySelector('.login-btn')
const email_log = document.querySelector('.email-log')
const password_log = document.querySelector('.password-log')
// const formAlert = document.querySelector('.form-alert')

btn.addEventListener('click', async (e) => {
    e.preventDefault()
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

})

btn_log.addEventListener('click', async (e) => {
    e.preventDefault()
    console.log('hits');
    const emaillog = email_log.value
    const passwordlog = password_log.value
    console.log(emaillog, passwordlog);

    const loger = await fetch('http://localhost:4000/login', {
        method:'POST',
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
    result.innerHTML=`${DATA1.status} ${DATA1.data._id},${DATA1.msg}`
    


})

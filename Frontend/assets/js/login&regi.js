const btn_log = document.querySelector('.button2')
const email_log = document.querySelector('.email')
const password_log = document.querySelector('.password')

btn_log.addEventListener('click', async (e) => {
    e.preventDefault()

    const email = email.value
    const password = password.value
    console.log(emaillog, password);
    ihtml = ``
    try {

        const loger = await fetch('http://localhost:4000/login', {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: {
                'Content-Type': 'application/json'
            }

        })
        if (!loger.ok) {
            const { msg } = loger.json()
            throw Error(msg + "  " + loger.status)
        }
        else {
            const { data, msg, token } = await loger.json()
            localStorage.setItem("token", token)
            ihtml += `${msg}`
            result.innerHTML = ihtml
            setTimeout(() => {
                location.replace("newdashboard.html")
            }, 3000);
        }

    }

    catch (error) {
        console.log(error)
    }
})


const btn_regi = document.querySelector('.registrationButton')
const name_regi = document.querySelector('.name_regi')
const email_regi = document.querySelector('.email_regi')
const password_regi = document.querySelector('.password_regi')
const confirmPassword_regi = document.querySelector('.confirmPassword_regi')


btn_regi.addEventListener('click', async (e) => {
    e.preventDefault()
    if (password_log.value == confirmPassword_regi.value) {
        const name = name_regi.value
        const email = email_regi.value
        const password = password_regi.value
        try {
            const fetcher = await fetch('http://localhost:4000/registration', {
                method: 'POST',
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                }),
                headers: {
                    'Content-Type': 'application/json',
                }

            })
            if (!fetcher.ok) {
                const { msg, error } = await fetcher.json()
                throw Error(fetcher.status + " " + error)
            }
            const { token, msg } = await fetcher.json()

            result.innerHTML = `${msg}`
            localStorage.setItem("token", token)
            setTimeout(() => {
                location.replace("newdashboard.html")
                
            }, 5000);
            name_regi.value = ``
            email_regi.value = ``
            password_regi.value = ``
            confirmPassword_regi.value = ``
        } catch (error) {
            console.log('Error===>', error)
        }

    }
    else {
        result.innerHTML = `Password is not Matching`
    }

})






const btn_log = document.querySelector('.btn_log')
const email_log = document.querySelector('.email_log')
const password_log = document.querySelector('.password_log')

btn_log.addEventListener('click', async (e) => {
    e.preventDefault()

    const email = email_log.value
    const password = password_log.value
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
            alert(`${msg}`)
            setTimeout(() => {
                location.replace("Dashboard.html")
            }, 3000);
        }

    }

    catch (error) {
        console.log(error)
    }
})


const btn_regi = document.querySelector('.btn_regi')
const name_regi = document.querySelector('.name_regi')
const email_regi = document.querySelector('.email_regi')
const mob_no = document.querySelector('.mob_no')
const password_regi = document.querySelector('.password_regi')
const confirmPassword_regi = document.querySelector('.confirmPassword_regi')


btn_regi.addEventListener('click', async (e) => {
    e.preventDefault()
    if (password_regi.value == confirmPassword_regi.value) {
        const name = name_regi.value
        const email = email_regi.value
        const mob = mob_no.value
        const password = password_regi.value
        try {
            const fetcher = await fetch('http://localhost:4000/registration', {
                method: 'POST',
                body: JSON.stringify({
                    name: name,
                    email: email,
                    mob_no:mob,
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
            localStorage.setItem("token", token)
            alert(`${msg}`)
            setTimeout(() => {
                location.replace("Dashboard.html")
                
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
        console.log(`Password is not Matching`);
    }

})

const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}




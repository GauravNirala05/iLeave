const usertoken = localStorage.getItem('token');
if (usertoken!=null){
  alert(`You are already logged in. If you need to log in with a different account, please log out first.`)
  location.replace("dashboard.html")
}



const btn_log = document.querySelector('.btn_log')
const email_log = document.querySelector('.email_log')
const password_log = document.querySelector('.password_log')

btn_log.addEventListener('click', async (e) => {
    document.getElementById("loginerrormsg").innerHTML = ``
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
            console.log(msg)
            throw Error(msg + "  " + loger.status)
        }
        else {
            const { data, msg, token } = await loger.json()
            localStorage.setItem("token", token)
            // alert(`${msg}`)
            location.replace("Dashboard.html")
                
            
        }

    }

    catch (error) {
        console.log(error)
        if (error=="Error: undefined  400"){
            document.getElementById("loginerrormsg").innerHTML = `User not Registered`
        }
        if (error=="Error: undefined  401"){
            document.getElementById("loginerrormsg").innerHTML = `Wrong Password`
        }
        if (email=='' || password ==''){
            document.getElementById("loginerrormsg").innerHTML = `Fill all the information`
        }
    }
})


const btn_regi = document.querySelector('.btn_regi')
const name_regi = document.querySelector('.name_regi')
const email_regi = document.querySelector('.email_regi')
const password_regi = document.querySelector('.password_regi')
const confirmPassword_regi = document.querySelector('.confirmPassword_regi')
var errorhtml = document.getElementById("errormsg").innerHTML;


btn_regi.addEventListener('click', async (e) => {
    e.preventDefault()
    if (password_regi.value == confirmPassword_regi.value) {
        document.getElementById("errormsg").innerHTML = ``
        const name = name_regi.value
        const email = email_regi.value
        // const mob = mob_no.value
        const password = password_regi.value
        try {
            const fetcher = await fetch('http://localhost:4000/registration', {
                method: 'POST',
                body: JSON.stringify({
                    name: name,
                    email: email,
                    // mob_no: mob,
                    password: password
                }),
                headers: {
                    'Content-Type': 'application/json',
                }

            })
            if (!fetcher.ok) {
                const status = fetcher.status
                console.log(status)
                const { msg, error } = await fetcher.json()
                console.log(msg);
                throw Error(`${status}`)
            }
            const { msg } = await fetcher.json()
            alert(`${msg}`)
            // setTimeout(() => {
            //     location.replace("login.html")
                
            // }, 1000);
            // name_regi.value = ``
            // email_regi.value = ``
            // password_regi.value = ``
            // confirmPassword_regi.value = ``
        } catch (error) {
            console.log(error)
            if (error == "Error: 500"){
                document.getElementById("errormsg").innerHTML = `Fill all the information`
            }
            if (error == "Error: 400"){
                document.getElementById("errormsg").innerHTML = `User with this email already exists...`
            }
        }

    }
    else {
        console.log(`Password is not Matching`);
        document.getElementById("errormsg").innerHTML = `Password is not Matching`
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
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}



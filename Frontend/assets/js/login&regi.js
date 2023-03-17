const usertoken = localStorage.getItem('token');

if (usertoken!=null){
  location.replace("dashboard.html")
}

const btn_log = document.querySelector('.btn_log')
const email_log = document.querySelector('.email_log')
const password_log = document.querySelector('.password_log')

btn_log.addEventListener('click', async (e) => {
    e.preventDefault()
    document.getElementById("loginerrormsg").innerHTML = ``
    if (!LOGform.checkValidity()) {
        return;
      }

    const email = email_log.value
    const password = password_log.value
    
    try {
        const loger = await fetch('http://localhost:4000/signin', {
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
            console.log(loger)
            throw Error(`${msg},${loger.status}`)
        }
        else {
            const { data, msg, token } = await loger.json()
            localStorage.setItem("token", token)
            location.replace("dashboard.html")
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
const email_regi = document.querySelector('.email_regi')
const password_regi = document.querySelector('.password_regi')
const confirmPassword_regi = document.querySelector('.confirmPassword_regi')
var errorhtml = document.getElementById("errormsg").innerHTML;
const errorElement=document.getElementById("error")


btn_regi.addEventListener('click', async (e) => {
    if (!form.checkValidity()) {
        return;
      }
    e.preventDefault()
    // validateInputs();
    if (password_regi.value == confirmPassword_regi.value) {
        document.getElementById("errormsg").innerHTML = ``
        const email = email_regi.value
        // const mob = mob_no.value
        const password = password_regi.value
        try {
            const fetcher = await fetch('http://localhost:4000/registration', {
                method: 'POST',
                body: JSON.stringify({
                    email: email,
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
            showPopup()

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
//for validation
const setError=(element,message)=>{
    const inputControl=element.parentElement;
    const errorDisplay=inputControl.querySelector(".error")
    errorDisplay.innerText=message
    inputControl.classList.add("error")
    inputControl.classList.remove("success")
}
const setSuccess=(element)=>{
    const inputControl=element.parentElement;
    const errorDisplay=inputControl.querySelector(".error")
    errorDisplay.innerText=''
    inputControl.classList.add("success")
    inputControl.classList.remove("error")
}
const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const validateInputs=()=>{
    const email_regiValue=email_regi.value.trim()
    const password_regiValue=password_regi.value.trim() 
    if (email_regiValue==''){
        setError(email_regi,'Email is required')
    }else{
            setSuccess(email_regi)
    }
    if (password_regiValue==''){
        setError(password_regi,'Password is required')
    }else if(password_regiValue.length<8){
            setError(password_regi,'Password must be at least 8 character')
    }else{
        setSuccess(password_regi)
    }
}
//for validation
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


// Get the popup and button elements
const myPopup = document.getElementById("myPopup");
const myButton = document.getElementById("myButton");
const closeButton = document.getElementById("closeButton");



// Show the popup when the button is clicked
function showPopup() {
  myPopup.style.display = "block";
}

// Hide the popup when the close button is clicked
function hidePopup() {
  myPopup.style.display = "none";
}

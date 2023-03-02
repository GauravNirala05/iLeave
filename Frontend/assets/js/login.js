const alluser_btn = document.querySelector('.alluser')
const error_message = document.querySelector('.error_result')

const btn_log = document.querySelector('.login-btn')
const email_log = document.querySelector('#email')
const password_log = document.querySelector('#password')

    // Get the modal
var modal = document.getElementById("myModal");  
var suc_modal = document.getElementById("success-model");  

    // Get the <span> element that closes the modal
const span = document.querySelector('.close');

// When the user clicks on the button, open the modal
span.onclick = function() {
    modal.style.display = "";
    }


window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        suc_modal.style.display = "none";
    }
}

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
        // ihtml += `${DATA1.data.name}`
    alluser_btn.hidden=false
    const id = DATA1.data._id
    localStorage.setItem("id", id)
    console.log(localStorage)
        suc_modal.style.display = "block";
        setTimeout(() => {  location.replace("../dash_board.html"); }, 1000);
        
    }
    if (DATA1.status === 'FAILED') {
        ihtml = `${DATA1.msg}`
        error_message.innerHTML = ihtml
        modal.style.display = "block";
    }
    error_message.innerHTML = ihtml

    

})

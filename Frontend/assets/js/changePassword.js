// Show the popup when the button is clicked
function showPopup(msg) {
    if (!form.checkValidity()) {
        return;
    }
    myPopup.style.display = "block";
    document.querySelector('#resetPasswordMsg').innerHTML = msg
}

// Hide the popup when the close button is clicked
function hidePopup() {
    myPopup.style.display = "none";
}
async function resetPassword() {
    try {
        const resetPassword = document.querySelector('#resetPassword').value
        const resetPasswordConfirm = document.querySelector('#resetPasswordConfirm').value
        if (resetPassword === resetPasswordConfirm) {
            const resetPasswordData = await fetch(`/forgotPassword/resetPass`, {
                method: 'PATCH',
                body: JSON.stringify({
                    password: resetPasswordConfirm
                }),
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            if (!resetPasswordData.ok) {
                const status = resetPasswordData.status
                const { msg } = await resetPasswordData.json()
                throw Error(`${status} ${msg}`)
            }
            else {
                const { msg } = await resetPasswordData.json()
                showPopup(msg)
                localStorage.removeItem('token')
                location.replace("login.html")
            }
        } else {
            throw Error(`Passwords are not matching...`)
        }

    } catch (error) {
        showPopup(error)
    }
}
const resetPasswordBtn = document.querySelector('#resetPasswordBtn')

resetPasswordBtn.addEventListener('click', async (e) => {
    e.preventDefault()
    const forgotPassEmail = document.querySelector('#resetPasswordEmail').value
    console.log(forgotPassEmail);
    try {
        const forgotPassData = await fetch(`/forgotPassword`, {
            method: 'POST',
            body: JSON.stringify({
                email: forgotPassEmail
            }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        if (!forgotPassData.ok) {
            const status = forgotPassData.status
            const { msg } = await forgotPassData.json()
            throw Error(`${status} ${msg}`)
        }
        else {
            const { userid, msg } = await forgotPassData.json()
            showPopup(msg)
            document.querySelector('#form').innerHTML = `
                <img class="logo" src="images/name.svg">
                <span class="row mb-5">
                <h2>Reset Password</h2>
                </span>

                <input type="number" id="resetPasswordOTP" class="email" placeholder="OTP" />

                <button id="OtpVerification" class="mt-4 mb-5">Submit</button>
                <button class="mt-4 mb-5" id="sendOTPAgain">Re-Send OTP</button>
                <a target="_blank" href="login.html">Sign In and Register</a>
            `
        }

    } catch (error) {
        showPopup(error)
    }
})
const sendOTPAgain=document.querySelector('#sendOTPAgain')
if(sendOTPAgain){
    sendOTPAgain.addEventListener('click',async (e)=>{
        e.preventDefault()
        
    })
}
const OtpVerification = document.querySelector('#OtpVerification')
if (OtpVerification) {
    OtpVerification.addEventListener('click', async (e) => {
        e.preventDefault()
        try {
            console.log((id));
            const resetPasswordOTP = document.querySelector('#resetPasswordOTP').value
            console.log(resetPasswordOTP);
            const verifyOTPData = await fetch(`/forgotPassword/verifyOTP`, {
                method: 'POST',
                body: JSON.stringify({
                    id: id,
                    OTP: resetPasswordOTP
                }),
                headers: {
                    'Content-type': 'application/json'
                }
            })
            if (!verifyOTPData.ok) {
                const status = verifyOTPData.status
                const { msg } = await verifyOTPData.json()
                throw Error(`${status} ${msg}`)
            }
            else {
                const { token, msg } = await verifyOTPData.json()
                showPopup(msg)
                localStorage.setItem('token', token)
                document.querySelector('#form').innerHTML = `
                <img class="logo" src="images/name.svg">
                <span class="row mb-5">
                <h2>Reset Password</h2>
                </span>
    
                <input required type="String" id="resetPassword" class="email" placeholder="New Password" />
                <input required type="String" id="resetPasswordConfirm" class="email" placeholder="Confirm Password" />
    
                <button class="mt-4 mb-5" id="resetPassword">Reset Password</button>
                <a target="_blank" href="login.html">Sign In and Register</a>
                `
            }
        } catch (error) {
            showPopup(error)
        }
    })
}

const token = localStorage.getItem('token')
const getUserDetails = async () => {
    try {
        const user = await fetch('/getUserData', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if (!user.ok) {
            const userData = await user.json()
            throw Error(userData.msg)
        }

        else {
            const { data } = await user.json()
            if (data.profileCompleted == false) {
                openmodal()
            }
            else {
                document.querySelector(".userName").innerHTML = data.name
                document.querySelector(".userDepartment").innerHTML = data.department
                document.querySelector(".userDesignation").innerHTML = data.designation
                document.querySelector(".userEmail").innerHTML = data.email
                document.querySelector(".userGreet").innerHTML = `Mr.`
            }
        }
    } catch (error) {
        console.log(error);
    }

}
getUserDetails()

function openmodal() {
    document.getElementById("popup3").style.display = "block";
}
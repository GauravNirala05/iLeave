const getReferenceUser = async () => {
    try {
        const getRefUser = await fetch('/getReferenceUser', {
            headers: {
                'Authorization': `Bearer ${token}`
            }

        })
        if (!getRefUser.ok) {
            const users = await getRefUser.json()
            throw Error(users.msg)
        }
        const { data, hits } = await getRefUser.json()
        console.log(data)
        const ref1 = document.querySelector('.reference1')
        const ref2 = document.querySelector('.reference2')
        const ref3 = document.querySelector('.reference3')
        const ref4 = document.querySelector('.reference4')
        if (hits == 0) {
            var opt1 = document.createElement('option')
            opt1.innerHTML = `--empty--`
            var opt2 = document.createElement('option')
            opt2.innerHTML = `--empty--`
            var opt3 = document.createElement('option')
            opt3.innerHTML = `--empty--`
            var opt4 = document.createElement('option')
            opt4.innerHTML = `--empty--`
            ref1.append(opt1)
            ref2.append(opt2)
            ref3.append(opt3)
            ref4.append(opt4)
        }
        else {
            for (item in data) {
                var opt1 = document.createElement('option')
                opt1.innerHTML = `${item.name}`
                var opt2 = document.createElement('option')
                opt2.innerHTML = `${item.name}`
                var opt3 = document.createElement('option')
                opt3.innerHTML = `${item.name}`
                var opt4 = document.createElement('option')
                opt4.innerHTML = `${item.name}`
                ref1.append(opt1)
                ref2.append(opt2)
                ref3.append(opt3)
                ref4.append(opt4)

            }
        }

    }
    catch (error) {
        console.log(error)
    }
}

const token = localStorage.getItem('token')

const main = document.querySelector(".main-content")
const sidebar = document.querySelector(".sidebar")
const pop2 = document.querySelector("#popup2")
const f = document.querySelector("#logmsg")

if (token == null) {
    pop2.hidden = false
    main.hidden = true
    f.innerHTML = `You Need to Login First`
    sidebar.hidden = true
    openPopup2()
}
else{
    getReferenceUser()
}


const button_apply = document.querySelector('.btn_apply')

button_apply.addEventListener('click', async (e) => {
    e.preventDefault()

    const contactno = document.querySelector('.mob_no').value
    const fromdate = document.querySelector('.fromdate').value
    const todate = document.querySelector('.todate').value
    const reference1 = document.querySelector('.reference1').value
    const reference2 = document.querySelector('.reference2').value
    const reference3 = document.querySelector('.reference3').value
    const reference4 = document.querySelector('.reference4').value
    const leave_type = document.querySelector('.leavetype').value
    const reason = document.querySelector('.reason').value

    if (!fromdate || !todate) {
        throw Error(`please provide dates first`)
    }
    const date2 = new Date(fromdate)
    const date1 = new Date(todate)
    console.log(date1 - date2);
    const totaldays = (((date1 - date2) / (1000 * 60 * 60 * 24)) + 1)
    console.log(totaldays);
    try {
        const token = localStorage.getItem('token')
        if (!token) {
        }
        const fetcher = await fetch('http://localhost:4000/applyLeave', {

            method: 'POST',

            body: JSON.stringify({
                contect_no: contactno,
                from_date: fromdate,
                to_date: todate,
                total_days: totaldays,
                reference1: { name: reference1 },
                reference2: { name: reference2 },
                reference3: { name: reference3 },
                reference4: { name: reference4 },
                leave_type: leave_type,
                discription: reason,
            }),

            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }


        })
        if (!fetcher.ok) {
            const { msg } = await fetcher.json()
            throw Error(`${msg}`)
        }
        else {
            const { leave, status } = await fetcher.json()
            alert(`${leave.employee_name} your leave is applied`)
        }
        // setTimeout(() => {
        //     $(document).ready(function () {
        //         $("#btn_apply").click(function () {
        //             $("#myModal").modal();
        //         });
        //     });
        // }, 3000)
        // apply_name.value=``
        // apply_contactno.value=``
        // apply_fromdate.value=``
        // apply_todate.value=``
        // apply_totaldays.value=``
        // reference1.value=``
        // reference2.value=``
        // reference3.value=``
        // reference4.value=``
        // apply_type.value=``
        // apply_reason.value=``
    } catch (error) {
        alert(error)
    }
})

function openPopup() {
    document.getElementById("popup").style.display = "block";
}

function openPopup2() {
    document.getElementById("popup2").style.display = "block";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

function confirm_logout() {
    localStorage.removeItem('token');
    location.replace("index.html")
}
function complete_profile() {
    location.replace("complete_profile.html")
}
function login() {
    location.replace("login.html")
}


const token = localStorage.getItem('token')
console.log(token);

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

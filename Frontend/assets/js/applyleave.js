
const UserDesignation = localStorage.getItem('UserDesignation')
const getReferenceUser = async () => {
    try {
        const getRefUser = await fetch('/getReferenceUser', {
            headers: {
                'Authorization': `Bearer ${token}`
            }

        })
        if (!getRefUser.ok) {
            const status = getRefUser.status
            const { msg } = await getRefUser.json()
            var arraryError = []
            arraryError.push(status)
            arraryError.push(msg)
            errorHandler(arraryError)
        }
        else {
            const { data, hits } = await getRefUser.json()
            const ref1 = document.querySelector('.reference1')
            const ref2 = document.querySelector('.reference2')
            const ref3 = document.querySelector('.reference3')
            const ref4 = document.querySelector('.reference4')
            const ref = document.querySelector('.reference')

            if (UserDesignation === 'HOD') {
                if (hits == 0) {
                    var opt = document.createElement('option')
                    opt.innerHTML = `--empty--`
                    ref.append(opt)
                }
                else {
                    for (item of data) {
                        var opt = document.createElement('option')
                        opt.innerHTML = `${item.name}`
                        ref.append(opt)

                    }
                }
            }
            if (UserDesignation === 'faculty') {

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
                    for (item of data) {
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
        }
        off()
    }
    catch (error) {
        console.log(error)
    }
}

if (UserDesignation == 'HOD') {
    const hodLeaveApply = document.querySelector("#ref_hide_hod")
    hodLeaveApply.hidden = false
    getReferenceUser()

}
if (UserDesignation == 'faculty') {
    const facultyLeaveApply = document.querySelector("#All_ref_hide")
    facultyLeaveApply.hidden = false
    getReferenceUser()
}
if (UserDesignation == 'principal') {
    console.log(`its running`);
    off()
}



const button_apply = document.querySelector('.btn_apply')

button_apply.addEventListener('click', async (e) => {
    if (!contactForm.checkValidity()) {
        return;
    }
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

    //for Hod
    const reference = document.querySelector('.reference').value

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
                reference: { name: reference },
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
            off()
            throw Error(`${msg}`)
        }
        else {
            off()
            const { leave, status } = await fetcher.json()
            alert(`${leave.employee_name} your leave is applied`)
        }
        off()
    } catch (error) {
        alert(error)
        off()

    }
})



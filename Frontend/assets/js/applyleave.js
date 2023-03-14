// const usertoken = localStorage.getItem('token');
// if (usertoken==null){
//   alert(`You need to log in or authenticate to access this resource. Please click ok to log in or create an account.`)
//   location.replace("login.html")
// }
const applyLeave = async () => {
    const button_apply = document.querySelector('.btn_apply')
    const apply_name = document.querySelector('.name')
    const apply_contactno = document.querySelector('.mob_no')
    const apply_fromdate = document.querySelector('.fromdate')
    const apply_todate = document.querySelector('.todate')
    const apply_totaldays = document.querySelector('.totaldays')
    const reference1 = document.querySelector('.reference1')
    const reference2 = document.querySelector('.reference2')
    const reference3 = document.querySelector('.reference3')
    const reference4 = document.querySelector('.reference4')
    const apply_type = document.querySelector('.leavetype')
    const apply_reason = document.querySelector('.reason')
    
    button_apply.addEventListener('click', async (e) => {
        e.preventDefault()
        // const formAlert = document.querySelector('.form-alert')
        const date2 = new Date(apply_fromdate.value)
        const date1 = new Date(apply_todate.value)
        const total_days1=(date1 - date2)/1000*60*60*24
        console.log(total_days1);
        console.log(total_days1+1)
        const name = apply_name.value
        const contactno = apply_contactno.value
        const fromdate = apply_fromdate.value
        const todate = apply_todate.value
        const total_days = apply_totaldays.value
        const ref1 = reference1.value
        const ref2 = reference2.value
        const ref3 = reference3.value
        const ref4 = reference4.value
        const leave_type = apply_type.value
        const reason = apply_reason.value
        // console.log(name, contactno, fromdate, todate, total_days,
            // ref1, ref2, ref3, ref4, leave_type, reason);


        const utoken = localStorage.getItem('token')
        // console.log(localStorage)

        if (utoken) {
            try {
                const fetcher = await fetch('http://localhost:4000/applyLeave', {
                    method: 'POST',
                    body: JSON.stringify({
                        contect_no: contactno,
                        from_date: fromdate,
                        to_date: todate,
                        total_days: total_days,
                        reference1: { name: ref1 },
                        reference2: { name: ref2 },
                        reference3: { name: ref3 },
                        reference4: { name: ref4 },
                        leave_type: leave_type,
                        discription: reason,

                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${utoken}`
                    }


                })
                if (!fetcher.ok) {
                    // const { msg, error } = await fetcher.json()
                    // throw Error(fetcher.status + " " + error)
                    const status = fetcher.status
                    console.log(status);
                    const { msg, error } = await fetcher.json()
                    console.log(msg);
                    throw new Error(`${status}`)
                }
                // console.log(localStorage)
                const { leave,status } = await fetcher.json()
                alert(`${leave.employee_name} your leave is applied`)
                setTimeout(() => {
                    $(document).ready(function () {
                        $("#btn_apply").click(function () {
                            $("#myModal").modal();
                        });
                    });
                }, 3000)
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
                console.log('Error===>', error)
            }
        }
    })

}



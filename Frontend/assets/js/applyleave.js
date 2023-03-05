
const btn_apply = document.querySelector('.btn_apply')
const apply_name = document.querySelector('#name')
const apply_contactno = document.querySelector('#mob_no')
const apply_fromdate = document.querySelector('#fromdate')
const apply_todate = document.querySelector('#todate')
const apply_totaldays = document.querySelector('#totaldays')
const reference1 = document.querySelector('#reference1')
const reference2 = document.querySelector('#reference2')
const reference3 = document.querySelector('#reference3')
const reference4 = document.querySelector('#reference4')
const apply_type = document.querySelector('#leavetype')
const apply_reason = document.querySelector('#reason')
// const token =localStorage.getItem('token')
// let token
// token=localStorage.getItem('token')
// console.log(localStorage)
btn_apply.addEventListener('click', async (e) => {
    // ihtml=``
    // const token =localStorage.getItem('token')
    e.preventDefault()
        // const formAlert = document.querySelector('.form-alert')
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
        console.log(name, contactno,fromdate,todate,total_days,
            ref1,ref2,ref3,ref4,leave_type,reason);
            
            let token
            localStorage.getItem('token',token)
            console.log(localStorage)

      if(token){ 
         try {
            const fetcher = await fetch(`http://localhost:4000/applyLeave`, {
                method: 'POST',
                body: JSON.stringify({
                    employee_name: name,
                    contect_no: contactno,
                    from_date: fromdate,
                    to_date:todate,
                    total_days: total_days,
                    reference1: ref1,
                    reference2: ref2,
                    reference3: ref3,
                    reference4: ref4,
                    leave_type: leave_type,
                    discription: reason,

                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${token}`
                }
               
   
            })
            if (!fetcher.ok) {
                const { msg, error } = await fetcher.json()
                throw Error(fetcher.status + " " + error)
            }
            console.log(localStorage)
            const { token, msg } = await fetcher.json()
            alert(`${msg}`)
            setTimeout(()=>{
                location.replace("Dasboard.html")
            },3000)
            apply_name.value=``
            apply_contactno.value=``
            apply_fromdate.value=``
            apply_todate.value=``
            apply_totaldays.value=``
            reference1.value=``
            reference2.value=``
            reference3.value=``
            reference4.value=``
            apply_type.value=``
            apply_reason.value=``

            // const { status, data, msg } = await fetcher.json()
            // console.log(data, status, msg)
            // const h5 = document.createElement('span')
            // h5.innerHTML = `${status}, ${data._id}, ${msg} `
            // result.appendChild(h5)
        } catch (error) {
            console.log('Error===>', error)
        }
    }
})



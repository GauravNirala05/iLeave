const result = document.querySelector('.result')
const apply_btn = document.querySelector('.apply_submit')
const apply_name = document.querySelector('#name')
const apply_startdate = document.querySelector('#startdate')
const apply_totaldays = document.querySelector('#totaldays')
const apply_contactno = document.querySelector('#contactno')
const apply_enddate = document.querySelector('#enddate')
const apply_type = document.querySelector('#leavetype')
const reference1 = document.querySelector('#reference1')
const reference2 = document.querySelector('#reference2')
const reference3 = document.querySelector('#reference2')
const reference4 = document.querySelector('#reference4')
const apply_reason = document.querySelector('#reason')
// const apply_checkbox = document.querySelector('#checkbox')
//console.log(ipassword,iconpassword);
apply_btn.addEventListener('click', async (e) => {
    // ihtml=``
    
    e.preventDefault()
    
        // const formAlert = document.querySelector('.form-alert')
        const name = apply_name.value
        const startdate = apply_startdate.value
        
        const totaldays = apply_totaldays.value
        const enddate = apply_enddate.value
        const contactno = apply_contactno.value
        const leavetype = apply_type.value
        const ref1 = reference1.value
        const ref2 = reference2.value
        const ref3 = reference3.value
        const ref4 = reference4.value
        const reason = apply_reason.value
        // totaldays.innerHTML=`${apply_enddate.value-apply_startdate.value}`
        console.log(name, startdate,enddate,totaldays,contactno
            ,leavetype,ref1,ref2,ref3,ref4,reason);
            
        // const checkbox = apply_checkbox.value
        try {
            let id ;
            id=localStorage.getItem("id",id)
            const fetcher = await fetch(`http://localhost:4000/applyLeave/apply_submit/${id}`, {
                method: 'POST',
                body: JSON.stringify({
                    employee_name: name,
                    to_date: startdate,
                    total_days: totaldays,
                    from_date: enddate,
                    contect_no: contactno,
                    leave_type: leavetype,
                    reference1: ref1,
                    reference2: ref2,
                    reference3: ref3,
                    reference4: ref4,
                    discription: reason,
                    // password: checkbox

                }),
                headers: {
                    'Content-Type': 'application/json'
                }
               
                
            })
           
            const { status, data, msg } = await fetcher.json()
            console.log(data, status, msg)
            const h5 = document.createElement('span')
            h5.innerHTML = `${status}, ${data._id}, ${msg} `
            result.appendChild(h5)
        } catch (error) {
            // console.log(error.response)
            console.log(error.response)
        }
})



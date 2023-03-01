// const methods = require("methods");

// const form=document.getElementById("form")
// form.addEventListener('submit',function(apply){
//     apply.preventDefault()
//     const formData=new FormData(form)
//     const jsonData=JSON.stringify(Object.fromEntries(formData.entries()));
//     fetch('http://httpbin.org/post',{
//         method:"POST",
//         headers:{
//             'Content-Type':'application/json'
//         },body:jsonData
//     })
//     .then(res=>res.json())
//     .then(data=>console.log(data))
//     .catch(err=>console.log(err))
// })
const result = document.querySelector('.result')
const apply_btn = document.querySelector('#apply_submit')
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
const apply_checkbox = document.querySelector('#checkbox')
//console.log(ipassword,iconpassword);
btn.addEventListener('click', async (e) => {
    e.preventDefault()
    

        // const formAlert = document.querySelector('.form-alert')

        const name = input.value
        const startdate = apply_name.value
        const totaldays = apply_totaldays.value
        const enddate = apply_enddate.value
        const contactno = apply_contactno.value
        const leavetype = apply_type.value
        const ref1 = reference1.value
        const ref2 = reference2.value
        const ref3 = reference3.value
        const ref4 = reference4.value
        const reason = apply_reason.value
        const checkbox = apply_checkbox.value

        
        try {
            const fetcher = await fetch('http://localhost:4000/applyLeave/:id', {
                mode: 'no-cors',
                method: 'POST',
                body: JSON.stringify({
                    name: nameValue,
                    email: email,
                    mob_no: mob_no,
                    department: department,
                    designation: designation,
                    password: password
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



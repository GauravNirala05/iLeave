// const methods = require("methods");

const form=document.getElementById("form")
form.addEventListener('submit',function(apply){
    apply.preventDefault()
    const formData=new FormData(form)
    const jsonData=JSON.stringify(Object.fromEntries(formData.entries()));
    fetch('http://httpbin.org/post',{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },body:jsonData
    })
    .then(res=>res.json())
    .then(data=>console.log(data))
    .catch(err=>console.log(err))
})
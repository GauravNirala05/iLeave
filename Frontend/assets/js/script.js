
const fun = async () => {
    try {
        const div = document.createElement('div')

        await fetch(`http://localhost:4000/faculty/sonu/leaveHistory`,{
            method:"POST",
            body:JSON.stringify(
                 username= document.getElementById().value
                //  username= document.getElementById().value
                //  username= document.getElementById().value
                //  username= document.getElementById().value
            ),
            headers:{
                'Content-type':application/json
            }
        })
        .then((v) => {
            let stat = v.status
            console.log(v.msg)
            if(v.ok){
                return v.json()
            }
        }).then((result) => {
            console.log(result);
            console.log(result.hits);
            div.innerHTML = `<h1>${result.data[0].employee_name}</h1>`
            document.body.appendChild(div)
        })

    } catch (error) {
        console.log(error);
    }
}
fun()
const fun2=(e)=>{
    console.log(e.msg);
}

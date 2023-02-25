
const fun = async () => {
    try {
        const div = document.createElement('div')
        
        await fetch(`http://localhost:4000/faculty/sonu/leaveHistory`, {

        }).then((v) => {
            console.log(v.status)
            return v.json()
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

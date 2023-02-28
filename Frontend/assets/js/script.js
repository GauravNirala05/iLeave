
const name1 = document.getElementById('name').value
console.log(name1); 
const email1 = document.getElementById('email').value
const department1 = document.getElementById('department').value
const mob_no1 = document.getElementById('mob_no').value
const designation1 = document.getElementById('designation').value
const password1 = document.getElementById('password').value
console.log(email1);
const fn = async () => {
    console.log(`its running`);

    const data = await fetch(`http://localhost:4000/registration`, {
        method: "POST",
        body: JSON.stringify(
            {
                name: 'name1',
                email: 'email1',
                department: 'department1',
                mob_no: 'mob_no1',
                designation: 'designation1',
                password: 'password1'
            }
        ),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data1=await data.json()
    console.log(data1 );

}

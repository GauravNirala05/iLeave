const getReferenceUser=async()=>{
    const token =localStorage.getItem('token')
    try{
        const getRefUser=await fetch('/getReferenceUser',{
            headers:{
                'Authorization':`Bearer ${token}`
            }
            
        })
        console.log("Running")
        if(!getRefUser.ok){
            const users=await getRefUser.json()
            throw Error(users.msg)
        }
        const users=await getRefUser.json()
        console.log(users)
        let ihtml=``
        for (item in users){
            ihtml+=` <option>person</option>
            <option>Person 2</option>
            <option>Person 3</option>
            <option>Person 4</option>
            `
        }
        document.getElementById('reference1').innerHTML=ihtml

    }
    catch(error){
        console.log(error)
    }
}
getReferenceUser()
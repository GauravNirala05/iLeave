const getuser=async ()=>{
  const token =localStorage.getItem('token')
  if(token){
    try {
      
      const user=await fetch('/loginUser',{
        headers:{
          'Authorization':`Bearer ${token}`
        }
      })
      if(!user.ok){
        throw Error('something went wrong')
      }
      const userData=await user.json()
      console.log(userData);
    } catch (error) {
      console.log(error);
    }
  }
}
getuser()
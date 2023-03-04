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
      console.log(userData)
      console.log(userData.data.designation)
      if (userData.data.designation==null){

      }
      let ihtml=``
      for(item in userData)
      {
        // console.log(userData);
        ihtml=`
        <div class=" user-wrapper ">
        <a class="btn  dropdown-toggle" style="border:none" type="button" id="dropdownMenuButton"
          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <img src="images/profile.jpg" width="40px" height="40px" alt="profile-img">
        </a>
        <div class="">
          <span>
            <h4 class="name mr-4">Prof.${userData.data.name}</h4>
          </span>

        </div>

        <div class="dropdown-menu text-center" aria-labelledby="dropdownMenuButton">
          <img src="images/profile.jpg" alt="John" style="width:70px;height: 70px;">
          <div class="card-header" style="margin:10px">
          <div>
              <h4 class="fa fa-envelope" style="font-size: 20px;">&nbsp;&nbsp;${userData.data.email}</h4>
            <p class="title">HOD</p>
            <p>Department of Computer Science</p>
          </div>
          </div>
        </div>
      </div>`
        
      }
      document.getElementById("profile").innerHTML=ihtml

    } catch (error) {
      console.log(error);
    }
  }
}
getuser()
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
              <p class="title">${userData.data.designation}</p>
              <p>${userData.data.department}</p>
            </div>
            </div>
          </div>
        </div>`
          
        }
        document.getElementById("profile").innerHTML=ihtml
        // document.getElementById("name").innerHTML=userData.data.name

        document.getElementById("Name").innerHTML=`<input type="text" class="name form-control Name" name="name" id="fname" value="${userData.data.name}" placeholder="Full name"
                          aria-required="true" aria-invalid="true">`
        
        document.getElementById("email").innerHTML=`<input type="email" class="form-control Name" name="email" id="email" value="${userData.data.email}" placeholder="Email"
                          aria-required="true" aria-invalid="true">`

        document.getElementById("number").innerHTML=`<input type="number" class="form-control Name" name="mob_no" id="data" value="${userData.data.mob_no}" placeholder="Full name"
                          aria-required="true" aria-invalid="true">`
                          
        document.getElementById("Designation").innerHTML=`<select class="form-control" id="designation">
        <option name="reference3" value="">Designation</option>
        <option>Faculty</option>
        <option>HOD</option>
        <option>Pricipal</option>
      </select>`

        document.getElementById("Department").innerHTML=`<select class="form-control" id="department">
        <option name="reference3" value="">Department</option>
        <option value="Computer Science">CSE</option>
        <option value="Iformation Tecnology">HOD</option>
        <option value="ET & T">ET & T</option>
        <option value="Mechanical">Mechanical</option>
        <option value="Civil">Civil</option>
        <option value="Mining">Mining</option>
      </select>`

      } catch (error) {
        console.log(error);
      }
    }
  }
  getuser()

  function openPopup() {
    document.getElementById("popup").style.display = "block";
  }
  
  function closePopup() {
    document.getElementById("popup").style.display = "none";
  }
const result = document.querySelector('.result')
let id ;
id=localStorage.getItem("id",id)
let url=`/alluser/${id}`
let fetch_profile=fetch(url)
fetch_profile.then((value)=>{
    return value.json()

}).then((profile_data)=>{
    console.log(profile_data)
    ihtml=``
    for(item in profile_data){
        console.log(profile_data[item])
    ihtml+=`
    <div>
                                     <h5 class="m-b-0 font-16">
                                     ${profile_data[item].name}
                                    </h5>
                                    <h5 class="m-b-0 font-16">
                                    ${profile_data[item].department}
                                    </h5>
                                    <h5 class="m-b-0 font-16">
                                      HOD
                                    </h5>
                                    <h5 class="m-b-0 font-16">
                                      Permanent
                                    </h5>
                                    <h5 class="m-b-0 font-16">
                                      983549923
                                    </h5>
                                    <h5 class="m-b-0 font-16">
                                      9LPA
                                    </h5>
                                    <h5 class="m-b-0 font-16">
                                      85
                                  </div>`
    }
    result.innerHTML=ihtml

})

// const result = document.querySelector('.result')
// const alluser_btn = document.querySelector('.alluser')
// alluser_btn.addEventListener('click', async (e) => {
//   e.preventDefault()
//   ihtml = ``
//   const id = localStorage.getItem("id")
//   console.log(localStorage)

//   const alluser = await fetch(`/alluser/${id}`)

//   const allusers = await alluser.json()
//   console.log((allusers));

//   const { status, msg, data } = allusers

//   if (status == "FAILED") {
//       ihtml = `${msg}`
//   }
//   else {
//       data.forEach(element => {
//           // ihtml += `<h1>${element.name}</h1><br>
//           // <h5>${element.email}</h5><h5>${element.designation}</h5><h5>${element.department}</h5>`
//           ihtml+=`
//           <div>
//                                     <h5 class="m-b-0 font-16">
//                                     ${element.name}
//                                    </h5>
//                                    <h5 class="m-b-0 font-16">
//                                    ${element.email}
//                                    </h5>
//                                    <h5 class="m-b-0 font-16">
//                                      HOD
//                                    </h5>
//                                    <h5 class="m-b-0 font-16">
//                                      Permanent
//                                    </h5>
//                                    <h5 class="m-b-0 font-16">
//                                      983549923
//                                    </h5>
//                                    <h5 class="m-b-0 font-16">
//                                      9LPA
//                                    </h5>
//                                    <h5 class="m-b-0 font-16">
//                                      85
//                                  </div>`
//       })
//   }
//   result.innerHTML=ihtml
// })

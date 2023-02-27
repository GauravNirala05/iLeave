
var signupform=document.getElementById('signupform')
signupform.addEventListener('submit',function(event){
    event.preventDefault()
    var name=document.getElementById('name').values
    console.log(name)
    var mob_no=document.getElementById('mob_no').values
    console.log(mob_no)
    var email=document.getElementById('email').values
    console.log(email)
    var password=document.getElementById('password').values
    console.log(password)
    var confirmpassowrd=document.getElementById('confirmpassword').values
    console.log(confirmpassowrd)
    var designation=document.getElementById('designation').values
    console.log(designation)
    var department=document.getElementById('department').values
    console.log(department)
   
})
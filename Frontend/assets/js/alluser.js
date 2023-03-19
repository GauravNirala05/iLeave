const techdepartment = document.querySelector("#TechDeparment")
techdepartment.hidden = true

function showTechDeparment() {
    if (techdepartment.hidden == true) {
        techdepartment.hidden = false
    }
    else  {
        techdepartment.hidden = true 
    }
}




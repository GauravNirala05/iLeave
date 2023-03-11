var imageUpload = document.getElementById("image-upload");
var previewImage = document.getElementById("preview-image");

imageUpload.addEventListener("change", function() {
  var file = this.files[0];
  var reader = new FileReader();

  reader.addEventListener("load", function() {
    previewImage.src = reader.result;
  });

  if (file) {
    reader.readAsDataURL(file);
  }
});


const save = document.querySelector('.save')
const newname = document.querySelector('.newname')
const mob_no = document.querySelector('.number')
const department = document.querySelector('.department')
const designation = document.querySelector('.designation')

save.addEventListener('click', async (e) => {
    const token =localStorage.getItem('token')
    e.preventDefault()
        const name = newname.value
        const mob = mob_no.value
        const depart = department.value
        const desig = designation.value
        try {
            const fetcher = await fetch('http://localhost:4000/Completeprofile', {
                method: 'PATCH',
                body: JSON.stringify({
                    name: name,
                    mob_no: mob_no,
                    department: department,
                    designation: designation
                }),
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + token
                }

            })
            if (!fetcher.ok) {
                const status = fetcher.status
                console.log(status)
                const { msg, error } = await fetcher.json()
                console.log(msg);
                throw Error(`${status}`)
            }
            const { msg } = await fetcher.json()
            alert(`${msg}`)
        } catch (error) {
            console.log(error)
        }

    }

)
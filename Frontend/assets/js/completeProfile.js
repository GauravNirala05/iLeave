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

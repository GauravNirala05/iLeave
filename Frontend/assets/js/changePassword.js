 // Show the popup when the button is clicked
 function showPopup() {
    if (!form.checkValidity()) {
      return;
    }
    myPopup.style.display = "block";
    console.log("ddd")
  }

  // Hide the popup when the close button is clicked
  function hidePopup() {
    myPopup.style.display = "none";
  }
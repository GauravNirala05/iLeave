function toggleDropdown() {
    var dropdown = document.getElementById("myDropdown");
    if (dropdown.style.display === "none") {
      dropdown.style.display = "block";
    } else {
      dropdown.style.display = "none";
    }
  }

  function openPopup() {
    document.getElementById("popup").style.display = "block";
  }
  
  function openPopup2() {
    document.getElementById("popup2").style.display = "block";
  }
  
  function closePopup() {
    document.getElementById("popup").style.display = "none";
  }
  
  function confirm_logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('designation');

    location.replace("index.html")
  }
  function complete_profile() {
    location.replace("complete_profile.html")
  }
  function login() {
    location.replace("login.html")
  }
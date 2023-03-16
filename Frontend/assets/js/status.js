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

  var content1 = document.getElementById("content-1");
  var content2 = document.getElementById("content-2");
  var button1 = document.getElementById("toggle-button-1");
  var button2 = document.getElementById("toggle-button-2");
  
  content1.style.display = "block";
  content2.style.display = "none";
  button1.classList.add("active");


  function toggleContentstatus() {
      content1.style.display = "block";
      content2.style.display = "none";
      button1.classList.add("active");
      button2.classList.remove("active");
  }

  function toggleContenthistory() {
      content1.style.display = "none";
      content2.style.display = "block";
      button1.classList.remove("active");
      button2.classList.add("active");
  }
  
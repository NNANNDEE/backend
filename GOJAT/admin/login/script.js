document.addEventListener("DOMContentLoaded", function() {
    const loginBtn = document.getElementById("loginBtn");
  
    loginBtn.addEventListener("click", function(event) {
      event.preventDefault(); // Mencegah form submit default
  
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();
  
      if (username === "" || password === "") {
        alert("Please fill in username and password");
        return;
      }
  
      // Jika valid, arahkan ke dashboard
      window.location.href = "../dashboard/dashboard.html";
    });
  });
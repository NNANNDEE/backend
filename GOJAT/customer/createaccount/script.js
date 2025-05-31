document.addEventListener("DOMContentLoaded", function () {
    const createBtn = document.getElementById("createBtn");
  
    if (createBtn) {
      createBtn.addEventListener("click", function () {
        // Ambil nilai input
        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const password = document.getElementById("password").value.trim();
  
        // Validasi sederhana
        if (!username || !email || !phone || !password) {
          alert("Please complete all data before creating an account!");
          return;
        }
  
        // Redirect ke dashboard
        window.location.href = "../dashboard/dashboard.html";
      });
    }
  })
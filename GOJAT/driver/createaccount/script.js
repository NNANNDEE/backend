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

        const data = {
          username: username,
          email: email,
          phone: phone,
          password: password
        }

        fetch('../../backend/regis-driver.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(res => {
          //window.location.href = "../dashboard/dashboard.html";
        })

        .catch(err => {
          alert("An error occurred while creating the account. Please try again.");
        });
  
        // Redirect ke dashboard
       
      });
    }
  })
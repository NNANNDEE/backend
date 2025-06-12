document.addEventListener("DOMContentLoaded", function () {
  const loginBtn = document.getElementById("loginBtn");
  const createBtn = document.getElementById("createBtn");

  // Bersihkan session sebelum mulai login baru
localStorage.removeItem("customerData");
sessionStorage.removeItem("customerData");


  loginBtn.addEventListener("click", function (event) {
    event.preventDefault();

     // Ambil nilai input
     const username = document.getElementById("username").value.trim();
     const password = document.getElementById("password").value.trim();

     // Validasi sederhana
     if (!username || !password) {
       alert("Please complete all data before creating an account!");
       return;
     }

     const data = {
       username: username,
       password: password
     }

     fetch('../../backend/login-customer.php', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(data)
     })
     .then(async res => {
        if (!res.ok) {
          const result = await res.json()
          throw new Error(result.message);
        } 
        const result = await res.json()
        const userData = JSON.stringify(result.data)
        localStorage.setItem("customerData", userData)
        localStorage.setItem("customerID", result.data.customerID);


       window.location.href = "../dashboard/dashboard.html";
     })

     .catch(err => {
       alert(err.toString());
     });

  });

  createBtn.addEventListener("click", function () {
    window.location.href = "../createaccount/createaccount.html";
  });

 
});
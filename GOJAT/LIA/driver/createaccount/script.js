createBtn.addEventListener("click", function () {
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !email || !phone || !password) {
    alert("Please complete all data before creating an account!");
    return;
  }

  if (password.length > 8) {
    alert("Password must be at most 8 characters long.");
    return;
  }

  const data = {
    username: username,
    email: email,
    phone: phone,
    password: password
  };

  fetch('../../backend/regis-driver.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(async res => {
      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.message);
      }

      const result = await res.json(); // result.data berisi user
      const userData = JSON.stringify(result.data); // ← sesuaikan dengan format dari PHP-mu
      localStorage.setItem("driverData", userData); // ← simpan user

      alert("Account has been successfully registered!");
      window.location.href = "../login/login.html"; // ← langsung ke dashboard
    })
    .catch(err => {
      alert(err.toString());
    });
});

document.addEventListener("DOMContentLoaded", function () {
  const loginBtn = document.getElementById("loginBtn");

  loginBtn.addEventListener("click", function () {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
      alert("Please fill in all the data.");
      return;
    }

    fetch("../../backend/login-admin.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    })
      .then(async (res) => {
        const result = await res.json();
        if (!res.ok) throw new Error(result.message);

        localStorage.setItem("adminData", JSON.stringify(result.data));
        window.location.href = "../dashboard/dashboard.html"; // arahkan ke dashboard admin
      })
      .catch((err) => {
        alert("login failed: " + err.message);
      });
  });
});

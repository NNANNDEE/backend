document.addEventListener("DOMContentLoaded", function () {
  const loginBtn = document.getElementById("loginBtn");
  const createBtn = document.getElementById("createBtn");

  loginBtn.addEventListener("click", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === "" || password === "") {
      alert("Please fill in username and password");
      return;
    }

    // Jika valid, arahkan ke dashboard
    window.location.href = "../dashboard/dashboard.html";
  });

  createBtn.addEventListener("click", function () {
    // Arahkan ke halaman pendaftaran (ubah sesuai struktur folder kamu)
    window.location.href = "../createaccount/createaccount.html";
  });
});
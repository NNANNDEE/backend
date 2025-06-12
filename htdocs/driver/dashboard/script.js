function logoutDriver() {
  localStorage.removeItem("driverData");
  window.location.href = "../../index.html";
}

function confirmLogout() {
  if (confirm("Are you sure you want to logout?")) {
    logoutDriver();
  }
}

document.addEventListener("DOMContentLoaded", function() {
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
      loginBtn.addEventListener('click', function() {
        window.location.href = "../dashboard/orders.html";
      });
    }
  });

const userdata = JSON.parse(localStorage.getItem("driverData"));
if (userdata) {
  document.getElementById("username").textContent = userdata.username || '-';
  document.getElementById("address").textContent = userdata.address || '-';
  document.getElementById("phone").textContent = userdata.phonenumber || '-';
  document.getElementById("vehicle").textContent = userdata.vehicle || '-';
  document.getElementById("numberplate").textContent = userdata.numberplate || '-';
} else {
  alert("User data not found. Please login again.");
  window.location.href = "../login/login.html";
}

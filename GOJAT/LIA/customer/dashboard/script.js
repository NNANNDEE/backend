function logoutCustomer() {
  localStorage.removeItem("customerData");
  window.location.href = "../../index.html";
}
function confirmLogout() {
  if (confirm("Are you sure you want to logout?")) {
    logoutCustomer();
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

const userdata = JSON.parse(localStorage.getItem("customerData"));
if (userdata) {
  document.getElementById("username").textContent = userdata.username || '-';
  document.getElementById("phone").textContent = userdata.phonenumber || '-';
  document.getElementById("email").textContent = userdata.email || '-';
} else {
  alert("User data not found. Please login again.");
  window.location.href = "../login/login.html";
}

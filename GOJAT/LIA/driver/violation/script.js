function logoutDriver() {
  localStorage.removeItem("driverData");
  window.location.href = "../../index.html";
}

function confirmLogout() {
  if (confirm("Are you sure you want to logout?")) {
    logoutDriver();
  }
}



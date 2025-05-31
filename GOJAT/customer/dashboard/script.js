function confirmLogout() {
  if (confirm('Are you sure you want to logout?')) {
      window.location.href = '../../berandau.html';
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
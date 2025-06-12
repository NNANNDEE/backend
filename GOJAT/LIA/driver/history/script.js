function logoutDriver() {
    localStorage.removeItem("driverData");
    window.location.href = "../../index.html";
  }
  
function confirmLogout() {
  if (confirm("Are you sure you want to logout?")) {
    logoutDriver();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const driver = JSON.parse(localStorage.getItem("driverData"));
  if (!driver || !driver.id) {
    alert("Driver belum login");
    return;
  }

  fetch("../../backend/get-history-driver.php")
  .then(res => res.json())
  .then(data => {
    const tableBody = document.querySelector("tbody");
    tableBody.innerHTML = "";

    if (!data.length) {
      tableBody.innerHTML = "<tr><td colspan='5'>Belum ada history.</td></tr>";
      return;
    }

    data.forEach(item => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.customerID}</td>
        <td>${item.customer_username}</td>
        <td>${item.order_time}</td>
        <td>Rp ${parseInt(item.price).toLocaleString("id-ID")}</td>
        <td>${item.status}</td>
      `;
      tableBody.appendChild(row);
    });
  })
  .catch(err => {
    console.error("Gagal mengambil history:", err);
  });
});

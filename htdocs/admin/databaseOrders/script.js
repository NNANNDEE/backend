function logoutAdmin() {
  localStorage.removeItem("adminData");
  window.location.href = "../../index.html";
}
function confirmLogout() {
  if (confirm("Are you sure you want to logout?")) {
    logoutAdmin();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector("tbody");

  fetch("../../backend/get-all-orders.php")
    .then(res => res.json())
    .then(data => {
      tableBody.innerHTML = "";

      if (!data.length) {
        tableBody.innerHTML = "<tr><td colspan='6'>No orders found.</td></tr>";
        return;
      }

      data.forEach(order => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${order.orderID}</td>
          <td>${order.driverID}</td>
          <td>${order.customerID}</td>
          <td>${order.order_time}</td>
          <td>Rp ${parseInt(order.price).toLocaleString('id-ID')}</td>
          <td>${order.status}</td>
        `;
        tableBody.appendChild(row);
      });
    })
    .catch(error => {
      console.error("Failed to fetch orders data:", error);
      tableBody.innerHTML = "<tr><td colspan='6'>Failed to load data.</td></tr>";
    });
});

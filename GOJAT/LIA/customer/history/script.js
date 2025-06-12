function logoutCustomer() {
  localStorage.removeItem("customerData");
  window.location.href = "../../index.html";
}

function confirmLogout() {
  if (confirm("Are you sure you want to logout?")) {
    logoutCustomer();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const customerData = JSON.parse(localStorage.getItem("customerData"));

  if (!customerData || !customerData.id) {
    console.error("ID pelanggan tidak ditemukan di localStorage.");
    document.querySelector(".orders-table tbody").innerHTML =
      '<tr><td colspan="6">Data pelanggan tidak ditemukan.</td></tr>';
    return;
  }

  fetch("../../backend/get-history-customer.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: customerData.id }),
  })
    .then((response) => response.json())
    .then((data) => {
      const tbody = document.querySelector(".orders-table tbody");
      tbody.innerHTML = "";

      if (Array.isArray(data)) {
        data.forEach((order) => {
          const row = document.createElement("tr");

          row.innerHTML = `
            <td>${order.orderID}</td>
            <td>${order.driverName}</td>
            <td>${order.order_time}</td>
            <td>${order.price}</td>
            <td>${order.status}</td>
          `;

          tbody.appendChild(row);
        });
      } else {
        tbody.innerHTML =
          '<tr><td colspan="6">Belum ada data riwayat.</td></tr>';
      }
    })
    .catch((err) => {
      console.error("Gagal memuat history:", err);
      document.querySelector(".orders-table tbody").innerHTML =
        '<tr><td colspan="6">Gagal memuat riwayat.</td></tr>';
    });
});

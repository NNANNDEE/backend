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
    console.error("CustomerID not found in Local Storage.");
    document.querySelector(".orders-table tbody").innerHTML =
      '<tr><td colspan="6">Customer data not found.</td></tr>';
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
          '<tr><td colspan="6">There is no historical data yet.</td></tr>';
      }
    })
    .catch((err) => {
      console.error("There is no historical data yet: ", err);
      document.querySelector(".orders-table tbody").innerHTML =
        '<tr><td colspan="6">Failed to load history.</td></tr>';
    });
});

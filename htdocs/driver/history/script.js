function logoutDriver() {
  localStorage.removeItem("driverData");
  window.location.href = "../../index.html";
}

function confirmLogout() {
  if (confirm("Are you sure you want to logout?")) {
    logoutDriver(); // ✅ perbaikan dari "logoutDriverr"
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const driverData = JSON.parse(localStorage.getItem("driverData"));

  if (!driverData || !driverData.id) {
    console.error("DriverID not found in Local Storage.");
    document.querySelector(".orders-table tbody").innerHTML =
      '<tr><td colspan="6">Driver data not found.</td></tr>';
    return;
  }

  fetch("../../backend/get-history-driver.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: driverData.id }), // sesuai dengan PHP
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const tbody = document.querySelector(".orders-table tbody");
      tbody.innerHTML = "";

      if (Array.isArray(data) && data.length > 0) {
        data.forEach((order) => {
          const row = document.createElement("tr");

          row.innerHTML = `
            <td>${order.customerID}</td>
            <td>${order.customer_username}</td>
            <td>${order.order_time}</td>
            <td>Rp ${parseInt(order.price).toLocaleString("id-ID")}</td>
            <td>${order.status}</td>
          `;

          tbody.appendChild(row);
        });
      } else {
        tbody.innerHTML =
          '<tr><td colspan="5">There is no historical data yet.</td></tr>';
      }
    })
    .catch((err) => {
      console.error("Failed to load history: ", err);
      document.querySelector(".orders-table tbody").innerHTML =
        '<tr><td colspan="5">Failed to load history.</td></tr>';
    });
});

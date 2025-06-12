function logoutDriver() {
  localStorage.removeItem("driverData");
  window.location.href = "../../index.html";
}

function confirmLogout() {
  if (confirm("Are you sure you want to logout?")) {
    logoutDriver();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const driverData = JSON.parse(localStorage.getItem("driverData"));
  if (!driverData || !driverData.id) {
    alert("Driver not logged in.");
    window.location.href = "../../index.html";
    return;
  }

  console.log("Logged-in driver ID:", driverData.id);

  const container = document.querySelector(".orders-cards");

  fetch(`../../backend/get-confirmed-order.php?driverID=${driverData.id}`)
    .then(res => res.json())
    .then(orders => {
      container.innerHTML = "";

      if (!orders.length) {
        container.innerHTML = "<p>No confirmed orders yet.</p>";
        return;
      }

      orders.forEach((order, index) => {
        const card = document.createElement("div");
        card.classList.add("order-card");

        card.innerHTML = `
          <h3>Order #${index + 1}</h3>
          <p>Name : ${order.customer_username}</p>
          <p>Destination : ${order.destination}</p>
          <p>Pick-Up Location : ${order.pickUp_location}</p>
          <p>Pick-Up time : ${order.order_time}</p>
          <p>Price : Rp${parseInt(order.price).toLocaleString("id-ID")}</p>
          <button class="apply-btn">Apply</button>
        `;

        const applyBtn = card.querySelector(".apply-btn");
        applyBtn.addEventListener("click", () => {
          const orderData = {
            orderID: order.orderID,
            driverID: driverData.id,
            customerID: order.customerID,
            order_time: order.order_time,
            price: order.price,
            status: "Completed"
          };

          fetch("../../backend/apply-order.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(orderData)
          })
            .then(res => res.json())
            .then(data => {
              if (data.success) {
                alert("Order successfully completed and moved to history.");
                card.remove();
              } else {
                alert("Failed to apply order. " + (data.message || ""));
              }
            })
            .catch(err => {
              console.error("Failed to send data:", err);
              alert("An error occurred while applying the order.");
            });
        });

        container.appendChild(card);
      });
    })
    .catch(err => {
      console.error("Failed to fetch orders data:", err);
      container.innerHTML = "<p>Error fetching orders.</p>";
    });
});

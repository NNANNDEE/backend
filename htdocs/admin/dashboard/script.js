function logoutAdmin() {
  localStorage.removeItem("adminData");
  window.location.href = "../../index.html";
}

function confirmLogout() {
  if (confirm("Are you sure you want to logout?")) {
    logoutAdmin();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  fetch("../../backend/get-driver-available.php")
    .then(res => res.json())
    .then(data => {
      console.log("FETCHED:", data);
      const listContainer = document.getElementById("driverList");

      if (!data.data || data.data.length === 0) {
        listContainer.innerHTML = "<p>No available drivers.</p>";
        return;
      }

      listContainer.innerHTML = "";

      data.data.forEach(driver => {
        const card = document.createElement("div");
        card.style.border = "1px solid #ccc";
        card.style.padding = "12px";
        card.style.marginBottom = "10px";
        card.style.borderRadius = "8px";
        card.innerHTML = `
          <p><strong>DriverID : </strong> ${driver.driverID}</p>
          <p><strong>Name : </strong> ${driver.driver_username}</p>
          <p><strong>Phone : </strong> ${driver.phone_number}</p>
          <p><strong>Email : </strong> ${driver.email}</p>
          <p><strong>Vehicle : </strong> ${driver.type_of_vehicle}</p>
          <p><strong>Number Plate : </strong> ${driver.number_plate}</p>
        `;
        listContainer.appendChild(card);
      });
    })
    .catch(err => {
      console.error("FETCH ERROR:", err);
      document.getElementById("driverList").innerHTML = "<p>Error loading drivers.</p>";
    });
});

function populateDriverDropdown(selectElement) {
  fetch("../../backend/get-driver-available.php")
    .then(res => res.json())
    .then(data => {
      if (!data.data || data.data.length === 0) return;

      selectElement.innerHTML = '<option selected disabled>Choose driver</option>';

      data.data.forEach(driver => {
        const option = document.createElement("option");
        option.value = driver.driverID;
        option.textContent = `${driver.driver_username} (${driver.number_plate})`;
        selectElement.appendChild(option);
      });
    })
    .catch(err => {
      console.error("FETCH DRIVER ERROR:", err);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  fetch("../../backend/get-order.php")
      .then(response => response.json())
      .then(orders => {
          const orderContainer = document.querySelector(".admin-card .order-card");
          orderContainer.innerHTML = ""; 

          orders.forEach(order => {
              const card = document.createElement("div");
              card.className = "order-card";
              card.style.cssText = "background:#f7f7f7; border-radius:12px; padding:20px 18px; margin-top:5px;";

              card.dataset.orderId = order.orderID;

              card.innerHTML = `
                  <div class="order-info">
                      <strong>Order ID:</strong> ${order.orderID}<br>
                      <strong>Name:</strong> ${order.customer_name}<br>
                      <strong>Destination:</strong> ${order.destination}<br>
                      <strong>Pickup Location:</strong> ${order.pickUp_location}<br>
                      <strong>Pickup Time:</strong> ${order.order_time}<br>
                      <div class="order-dropdown-row" style="display: flex; gap: 16px; margin: 14px 0;">
                          <div class="dropdown-group">
                              <label for="price">Price:</label>
                              <select class="price-select">
                                  <option value="10000">Rp 10.000</option>
                                  <option value="12000">Rp 12.000</option>
                                  <option value="15000">Rp 15.000</option>
                              </select>
                          </div>
                          <div class="dropdown-group">
                              <label for="driver">Select Driver:</label>
                              <select class="form-select driver-select">
                                  <option selected disabled>Choose driver</option>
                              </select>                              
                          </div>
                          <button class="confirm-btn" style="margin-left: 12px; margin-bottom:0;">Confirm</button>
                      </div>
                  </div>
              `;

              orderContainer.appendChild(card);
              const driverSelect = card.querySelector(".driver-select");
              populateDriverDropdown(driverSelect);  
          });
      })
      .catch(error => {
          console.error("Failed to fetch orders:", error);
      });
});

document.body.addEventListener("click", async function (e) {
  if (e.target.classList.contains("confirm-btn")) {
      const card = e.target.closest(".order-card");
      const orderId = card.dataset.orderId;

      const driverSelect = card.querySelector(".driver-select");
      const selectedDriverID = driverSelect.value;

      const priceSelect = card.querySelector(".price-select");
      const selectedPrice = priceSelect.value;

      if (!orderId || !selectedDriverID || !selectedPrice) {
          alert("Data incomplete! Please select driver and price.");
          return;
      }

      try {
          const driverRes = await fetch(`../../backend/get-driver-by-id.php?id=${selectedDriverID}`);
          const driverData = await driverRes.json();

          if (!driverData || !driverData.driverID) {
              alert("Driver not found.");
              return;
          }

          const payload = {
              orderID: orderId,
              driverID: parseInt(selectedDriverID),
              price: parseInt(selectedPrice)
            
          };

          const res = await fetch("../../backend/admin-confirm-order.php", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(payload)
          });

          const result = await res.json();
          if (res.ok) {
              alert("Order confirmed successfully!");
          } else {
              throw new Error(result.message || "Failed to confirm order.");
          }
      } catch (err) {
          alert("Error: " + err.message);
          console.error(err);
      }
  }
});

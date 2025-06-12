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
  const dateInput = document.getElementById("pickupdate");
  if (dateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    dateInput.value = `${yyyy}-${mm}-${dd}`;
  }

  const orderBtn = document.getElementById("orderBtn");
  if (orderBtn) {
    orderBtn.addEventListener("click", (e) => {
      e.preventDefault();
      orderBtn.disabled = true;

      const pickLocation = document.getElementById("pickup");
      const dest = document.getElementById("destination");
      const date = document.getElementById("pickupdate").value.trim();
      const time = document.getElementById("pickuptime").value.trim();

      const pickupDateTime = `${date} ${time}:00`;

      if (!pickLocation.value.trim() || !dest.value.trim() || !time) {
        alert("Data belum lengkap!");
        orderBtn.disabled = false;
        return;
      }

      const user = JSON.parse(localStorage.getItem("customerData"));
      if (!user || !user.id) {
        alert("User belum login atau ID tidak ditemukan");
        orderBtn.disabled = false;
        return;
      }

      const data = {
        start: pickLocation.value.trim(),
        end: dest.value.trim(),
        pickupTime: pickupDateTime,
        custID: user.id,
      };

      fetch("../../backend/add-order.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(async (res) => {
          if (!res.ok) {
            const result = await res.json();
            throw new Error(result.message);
          } else {
            alert("Order berhasil dibuat!");
          }
        })
        .catch((err) => {
          alert(err.toString());
        })
        .finally(() => {
          orderBtn.disabled = false;
        });
    });
  }

  const user = JSON.parse(localStorage.getItem("customerData"));
  if (user && user.id) {
    // Ambil status order
    fetch(`../../backend/customer-confirm-order.php?customerID=${user.id}`)
      .then((response) => {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          return response.json();
        } else {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error.message);
        alert(error.message);
      });

      let driverID
    // Ambil data order & driver
    fetch(`../../backend/get-order-by-customer.php?customerID=${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          console.log(data.message);
          return;
        }

        localStorage.setItem("driverID", data.driverID)
        document.getElementById("driver-name").textContent = data.driver_username;
        document.getElementById("driver-phone").textContent = data.phone_number;
        document.getElementById("driver-plate").textContent = data.number_plate;
        document.getElementById("driver-price").textContent =
          "Rp " + parseInt(data.price).toLocaleString("id-ID");
      })
      .catch((err) => {
        console.error("Failed to fetch driver info:", err);
      });
  } else {
    alert("User belum login, tidak bisa mengambil order");
  }

  const confirmBtn = document.getElementById("confirmBtn");

  confirmBtn.addEventListener("click", function () {
    const user = JSON.parse(localStorage.getItem("customerData"));
    // Data order yang mau disimpan, contoh ambil dari elemen driver-info-box atau form
    const orderData = {
      driverID: parseInt(localStorage.getItem("driverID")),
      customerId: user.id,
      driverName: document.getElementById("driver-name").innerText,
      orderTime: new Date().toISOString().slice(0, 16).replace("T", " "),
      price: parseInt(
        document.getElementById("driver-price").innerText.replace(/[^\d]/g, "")
      ),
      status: "Confirmed",
    };

    // Kirim data ke backend dengan fetch API
    fetch("../../backend/save-history.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    })
      .then(async (res) => {
        if (!res.ok) {
          const result = await res.json();
          throw new Error(result.message);
        } else {
          alert("Order berhasil dibuat!");
        }
      })
      .catch((err) => {
        alert(err.toString());
      });
  });
});

document.addEventListener("DOMContentLoaded", function () {
    const userdata = JSON.parse(localStorage.getItem("customerData"));
  
    if (!userdata) {
      alert("User data not found. Please login again.");
      window.location.href = "../../index.html";
      return;
    }
  
    const page = window.location.pathname.split("/").pop();
  
    // ----------- ACCOUNT PAGE -----------
    if (page === "account.html") {
      document.getElementById("username").textContent = userdata.username || "-";
      document.getElementById("customerID").textContent = userdata.id || "-";
      document.getElementById("address").textContent = userdata.address || "-";
      document.getElementById("phone").textContent = userdata.phonenumber || "-";
      document.getElementById("email").textContent = userdata.email || "-";
    }
  
    // ----------- EDIT PROFILE PAGE -----------
    if (page === "editprofile.html") {
      document.getElementById("name").value = userdata.username || "";
      document.getElementById("address").value = userdata.address || "";
      document.getElementById("phone").value = userdata.phonenumber || "";
      document.getElementById("email").value = userdata.email || "";
  
      const updateBtn = document.getElementById("btnupdate");
      updateBtn.addEventListener("click", function () {
        const username = document.getElementById("name").value.trim();
        const address = document.getElementById("address").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const email = document.getElementById("email").value.trim();
  
        if (!username || !address || !phone || !email) {
          alert("Please complete all fields.");
          return;
        }
  
        const updatedUserData = {
          id: userdata.id,
          username,
          address,
          phonenumber: phone,
          email
        };

        

  
        // Simpan di localStorage
        localStorage.setItem("customerData", JSON.stringify(updatedUserData));
  
        // Kirim ke backend
        fetch("../../backend/edit-customer-profile.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedUserData)
        })
          .then(response => response.text())
          .then(text => {
            try {
              const data = JSON.parse(text);
              if (data.status === "success") {
                alert("Profile updated successfully!");
                window.location.href = "account.html";
              } else {
                alert("Update failed: " + (data.message || "Unknown error"));
              }
            } catch (e) {
              console.error("Invalid JSON from backend:", text);
              alert("Server error. Please try again later.");
            }
          })
          .catch(error => {
            console.error("Fetch error:", error);
            alert("Network error.");
          });
      });
    }
  });
  
  // Logout handler
function logoutCustomer() {
  localStorage.removeItem("customerData");
  window.location.href = "../../index.html";
}
function confirmLogout() {
  if (confirm("Are you sure you want to logout?")) {
    logoutCustomer();
  }
}
  
document.addEventListener("DOMContentLoaded", function() {

  const page = window.location.pathname.split("/").pop()

  if (page === "editprofile.html") {
    document.getElementById("name").value = userdata.username || "";
    document.getElementById("age").value = userdata.age || "";
    document.getElementById("address").value = userdata.address || "";
    document.getElementById("vehicle").value = userdata.vehicle || "";
    document.getElementById("plate").value = userdata.numberplate || "";
    document.getElementById("phone").value = userdata.phonenumber || "";
    document.getElementById("email").value = userdata.email || "";

   
  }
    const updateBtn = document.getElementById("btnupdate");
    if(updateBtn) {
      updateBtn.addEventListener("click", function() {
          const username = document.getElementById("name").value.trim();
          const age = document.getElementById("age").value.trim();
          const address = document.getElementById("address").value.trim();
          const phonenumber = document.getElementById("phone").value.trim();
          const email = document.getElementById("email").value.trim();
          const typeofvehicle = document.getElementById("vehicle").value.trim();
          const numberplate = document.getElementById("plate").value.trim();
    
          if (!username || !age || !address|| !phonenumber|| !email || !typeofvehicle ||!numberplate) {
            alert("Please complete all data before creating an account!");
            return;
          }
  
          const updatedUserData = {
            username,
            age,
            address,
            phonenumber: phonenumber,
            email,
            vehicle: typeofvehicle,
            numberplate,
            id: userdata.id
          };
  
          localStorage.setItem("driverData", JSON.stringify(updatedUserData));
          fetch('../../backend/edit-driver-profile.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUserData)
          })
          .then(response => response.json())
          .then(data => {
            if (data.status === "success") {
              alert("User data updated successfully!");
            
              window.location.href = "account.html"; 
            } else {
              alert("Error updating user data.");
            }
          })
          .catch(error => {
            console.error("Error:", error);
            alert("Error updating user data.");
          });
  
      })
    } else {
        console.error("Update button not found.");
    }
  })



  function logoutDriver() {
    localStorage.removeItem("driverData");
    window.location.href = "../../index.html";
  }

  function confirmLogout() {
    if (confirm("Are you sure you want to logout?")) {
      logoutDriver();
    }
  }

  const userdata = JSON.parse(localStorage.getItem("driverData"))
  document.getElementById("username").textContent = userdata.username
  document.getElementById("driverID").textContent = userdata.id
  document.getElementById("address").textContent = userdata.address
  document.getElementById("age").textContent = userdata.age
  document.getElementById("phone").textContent = userdata.phonenumber
  document.getElementById("email").textContent = userdata.email
  document.getElementById("vehicle").textContent = userdata.vehicle
  document.getElementById("numberplate").textContent = userdata.numberplate

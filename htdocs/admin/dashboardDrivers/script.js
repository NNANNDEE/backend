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
    const searchBtn = document.getElementById("searchBtn");
    const iconEditBtn = document.getElementById("iconEditBtn");
    const saveBtn = document.getElementById("saveBtn");
    const deleteBtn = document.getElementById("deleteDriverBtn");
    const statusText = document.getElementById("status_text");
    const statusSelect = document.getElementById("status_select");

    let driversData = [];
    let currentDriver = null;

    fetch("../../backend/get-all-drivers.php")
        .then(res => res.json())
        .then(data => {
            driversData = data;
            const tableBody = document.getElementById("driverTableBody");
            tableBody.innerHTML = "";
            data.forEach(driver => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${driver.driverID}</td>
                    <td>${driver.driver_username}</td>
                    <td>${driver.phone_number}</td>
                    <td>${driver.number_plate}</td>
                    <td>${driver.status || ''}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(err => console.error("Failed to fetch driver data:", err));

    searchBtn.addEventListener("click", () => {
        const driverID = document.querySelector(".search-input").value.trim();
        const found = driversData.find(d => d.driverID === driverID);

        if (!found) return alert("Driver not found!");

        currentDriver = found;

        document.getElementById("driverID").textContent = found.driverID;
        document.getElementById("driver_username").textContent = found.driver_username;
        document.getElementById("phone_number").textContent = found.phone_number;
        document.getElementById("email").textContent = found.email;
        document.getElementById("driver_address").textContent = found.driver_address;
        document.getElementById("type_of_vehicle").textContent = found.type_of_vehicle;
        document.getElementById("driver_plate").textContent = found.number_plate;

        statusText.textContent = found.status || '';
        statusSelect.value = found.status || '';

        statusText.style.display = "inline";
        statusSelect.style.display = "none";
        saveBtn.style.display = "none";
    });

    iconEditBtn.addEventListener("click", () => {
        if (!currentDriver) return alert("Look for drivers first");

        statusText.style.display = "none";
        statusSelect.style.display = "inline";
        saveBtn.style.display = "inline";
    });

    saveBtn.addEventListener("click", () => {
        const newStatus = statusSelect.value;
        const driverID = currentDriver?.driverID;

        if (!driverID || !newStatus) {
            alert("Status or Driver ID is empty!");
            return;
        }

        fetch("../../backend/update-driver.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ driverID, status: newStatus }),
        })
        .then(res => res.text())
        .then(text => {
            try {
                const response = JSON.parse(text);
                if (response.success) {
                    alert("Status saved successfully.");
                    statusText.textContent = newStatus;
                    statusText.style.display = "inline";
                    statusSelect.style.display = "none";
                    saveBtn.style.display = "none";

                    const rows = document.querySelectorAll("#driverTableBody tr");
                    rows.forEach(row => {
                        if (row.children[0].textContent === driverID) {
                            row.children[4].textContent = newStatus;
                        }
                    });
                } else {
                    alert("Failed to save status: " + response.error);
                }
            } catch (err) {
                console.error("Response is not valid JSON:", text);
                alert("Failed to save status (error response)");
            }
        })
        .catch(err => {
            console.error("Failed to send to backend:", err);
            alert("An error occurred while saving.");
        });
    });

    deleteBtn.addEventListener("click", () => {
        if (!currentDriver) {
            alert("Please find and select the driver first before deleting.");
            return;
        }

        const driverID = currentDriver.driverID;
        const confirmDelete = confirm(`Are you sure you want to delete the driver with ID? ${driverID}?`);
        if (!confirmDelete) return;

        fetch('../../backend/delete-driver.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `driverID=${encodeURIComponent(driverID)}`
        })
        .then(res => res.text())
        .then(response => {
            if (response === 'success') {
                alert('Driver uninstalled successfully.');
                currentDriver = null;

                document.getElementById("driverID").textContent = "";
                document.getElementById("driver_username").textContent = "";
                document.getElementById("phone_number").textContent = "";
                document.getElementById("email").textContent = "";
                document.getElementById("driver_address").textContent = "";
                document.getElementById("type_of_vehicle").textContent = "";
                document.getElementById("driver_plate").textContent = "";
                statusText.textContent = "";
                statusSelect.value = "";
                statusText.style.display = "inline";
                statusSelect.style.display = "none";
                saveBtn.style.display = "none";

                const rows = document.querySelectorAll("#driverTableBody tr");
                rows.forEach(row => {
                    if (row.children[0].textContent === driverID) {
                        row.remove();
                    }
                });
                driversData = driversData.filter(d => d.driverID !== driverID);
            } else {
                alert('Failed to remove driver.');
            }
        })
        .catch(err => {
            console.error(err);
            alert('An error occurred while removing the driver.');
        });
    });
});

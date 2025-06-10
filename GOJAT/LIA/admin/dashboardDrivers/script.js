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

    // Load driver data
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
        .catch(err => console.error("Gagal ambil data driver:", err));

    // Tombol Search
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

    // Tombol Edit
    iconEditBtn.addEventListener("click", () => {
        if (!currentDriver) return alert("Cari driver terlebih dahulu");

        statusText.style.display = "none";
        statusSelect.style.display = "inline";
        saveBtn.style.display = "inline";
    });

    // Tombol Save
    saveBtn.addEventListener("click", () => {
        const newStatus = statusSelect.value;
        const driverID = currentDriver?.driverID;

        if (!driverID || !newStatus) {
            alert("Status atau Driver ID kosong!");
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
                    alert("Status berhasil disimpan.");
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
                    alert("Gagal menyimpan status: " + response.error);
                }
            } catch (err) {
                console.error("Respon bukan JSON valid:", text);
                alert("Gagal menyimpan status (respon error)");
            }
        })
        .catch(err => {
            console.error("Gagal kirim ke backend:", err);
            alert("Terjadi kesalahan saat menyimpan.");
        });
    });

    // Tombol Delete (INI SUDAH DI LUAR SAVE BUTTON)
    deleteBtn.addEventListener("click", () => {
        if (!currentDriver) {
            alert("Silakan cari dan pilih driver terlebih dahulu sebelum menghapus.");
            return;
        }

        const driverID = currentDriver.driverID;
        const confirmDelete = confirm(`Yakin ingin menghapus driver dengan ID ${driverID}?`);
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
                alert('Driver berhasil dihapus.');
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
                alert('Gagal menghapus driver.');
            }
        })
        .catch(err => {
            console.error(err);
            alert('Terjadi kesalahan saat menghapus driver.');
        });
    });
});

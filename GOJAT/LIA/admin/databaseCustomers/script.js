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
    const deleteBtn = document.getElementById("deleteCustomerBtn");

    let customersData = [];
    let currentCustomer = null;

    // Load customer data
    fetch("../../backend/get-all-customers.php")
        .then(res => res.json())
        .then(data => {
            customersData = data;
            const tableBody = document.getElementById("customerTableBody");
            tableBody.innerHTML = "";
            data.forEach(customer => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${customer.customerID}</td>
                    <td>${customer.customer_username}</td>
                    <td>${customer.phone_number}</td>
                    <td>${customer.email}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(err => console.error("Gagal ambil data customer:", err));

        searchBtn.addEventListener("click", () => {
            const customerID = document.querySelector(".search-input").value.trim();
            const found = customersData.find(d => d.customerID === customerID);

            if (!found) return alert("Customer not found!");

            currentCustomer = found;

            document.getElementById("customerID").textContent = found.customerID;
            document.getElementById("customer_username").textContent = found.customer_username;
            document.getElementById("phone_number").textContent = found.phone_number;
            document.getElementById("email").textContent = found.email;
            document.getElementById("customer_address").textContent = found.customer_address;
        });
        deleteBtn.addEventListener("click", () => {
            if (!currentCustomer) {
                alert("Silakan cari dan pilih customer terlebih dahulu sebelum menghapus.");
                return;
            }
    
            const customerID = currentCustomer.customerID;
            const confirmDelete = confirm(`Yakin ingin menghapus customer dengan ID ${customerID}?`);
            if (!confirmDelete) return;
    
            fetch('../../backend/delete-customer.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `customerID=${encodeURIComponent(customerID)}`
            })
            .then(res => res.text())
            .then(response => {
                if (response === 'success') {
                    alert('Customer berhasil dihapus.');
                    currentCustomer = null;
    
                    document.getElementById("customerID").textContent = "";
                    document.getElementById("customer_username").textContent = "";
                    document.getElementById("phone_number").textContent = "";
                    document.getElementById("email").textContent = "";
                    document.getElementById("customer_address").textContent = "";
    
                    const rows = document.querySelectorAll("#customerTableBody tr");
                    rows.forEach(row => {
                        if (row.children[0].textContent === customerID) {
                            row.remove();
                        }
                    });
                    customersData = customersData.filter(d => d.customerID !== customerID);
                } else {
                    alert('Gagal menghapus customer.');
                }
            })
            .catch(err => {
                console.error(err);
                alert('Terjadi kesalahan saat menghapus customer.');
        });
    });
});

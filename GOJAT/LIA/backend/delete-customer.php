<?php
include '../config/koneksi.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['customerID'])) {
    $customerID = $_POST['customerID'];

    $stmt = $koneksi->prepare("DELETE FROM customer WHERE customerID = ?");
    $stmt->bind_param("s", $customerID);

    if ($stmt->execute()) {
        echo "success";
    } else {
        echo "error";
    }

    $stmt->close();
    $koneksi->close();
} else {
    echo "invalid";
}
?>

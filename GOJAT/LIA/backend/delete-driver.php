<?php
include '../config/koneksi.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['driverID'])) {
    $driverID = $_POST['driverID'];

    $stmt = $koneksi->prepare("DELETE FROM driver WHERE driverID = ?");
    $stmt->bind_param("s", $driverID);

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

<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require_once '../config/koneksi.php'; // Pastikan file ini benar dan koneksi berhasil

$data = json_decode(file_get_contents('php://input'), true);

// Ambil dan bersihkan input
$username = strtolower(trim($data['username'] ?? ''));
$address = trim($data['address'] ?? '');
$phone = trim($data['phonenumber'] ?? '');
$email = trim($data['email'] ?? '');
$customerID = trim($data['id'] ?? '');

// Validasi data
if (empty($username) || empty($address) || empty($phone) || empty($email) || empty($customerID)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Incomplete data!']);
    exit;
}

// Query update data customer
$sql = "UPDATE customer
        SET customer_username = ?, customer_address = ?, phone_number = ?, email = ? 
        WHERE customerID = ?";

$stmt = $koneksi->prepare($sql);
$stmt->bind_param("ssssi", $username, $address, $phone, $email, $customerID);

if ($stmt->execute()) {
    http_response_code(200);
    echo json_encode(['status' => 'success', 'message' => 'Customer data updated successfully']);
} else {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Failed to update data: ' . $stmt->error]);
}

$stmt->close();
$koneksi->close();

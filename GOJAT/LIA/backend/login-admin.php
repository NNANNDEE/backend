<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require_once '../config/koneksi.php';

$data = json_decode(file_get_contents('php://input'), true);

$username = trim($data['username'] ?? '');
$password = trim($data['password'] ?? '');

if (empty($username) || empty($password)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Incomplete data']);
    exit;
}

$sql = "SELECT admin_username FROM admin WHERE admin_username = ? AND password = ?";
$stmt = $koneksi->prepare($sql);
$stmt->bind_param("ss", $username, $password);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $admin = $result->fetch_assoc();
    echo json_encode([
        'status' => 'success',
        'message' => 'Login berhasil',
        'data' => [
            'username' => $admin['admin_username'],
            'isloggedin' => true
        ]
    ]);
} else {
    http_response_code(401);
    echo json_encode(['status' => 'error', 'message' => 'Username or password is incorrect']);
}

$stmt->close();
$koneksi->close();

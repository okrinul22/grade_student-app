<?php
include 'dbconnect.php';

$msg = '';
$msg_type = '';

if (isset($_POST['add_student'])) {
    $name = trim($_POST['name']);
    $gender = $_POST['gender'];
    $address = trim($_POST['address']);

    // Check for duplicate student (same name, gender, and address)
    $check_query = "SELECT * FROM student WHERE name = ? AND gender = ? AND address = ?";
    $check_stmt = $conn->prepare($check_query);
    $check_stmt->bind_param("sss", $name, $gender, $address);
    $check_stmt->execute();
    $check_result = $check_stmt->get_result();

    if ($check_result->num_rows > 0) {
        $msg = "Student already exists with the same name, gender, and address!";
        $msg_type = "warning";
    } else {
        $query = "INSERT INTO student (name, gender, address) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("sss", $name, $gender, $address);

        if ($stmt->execute()) {
            $msg = "Student added successfully!";
            $msg_type = "success";
        } else {
            $msg = "Error: " . $conn->error;
            $msg_type = "danger";
        }
    }
}

// Store message in session and redirect
session_start();
$_SESSION['msg'] = $msg;
$_SESSION['msg_type'] = $msg_type;
header("Location: index.php");

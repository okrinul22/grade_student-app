<?php
include 'dbconnect.php';

session_start();

if (isset($_POST['update_student'])) {
    $uuid = (int)$_POST['uuid'];
    $name = trim($_POST['name']);
    $gender = $_POST['gender'];
    $address = trim($_POST['address']);

    // Check for duplicate student (same name, gender, and address) excluding current record
    $check_query = "SELECT * FROM student WHERE name = ? AND gender = ? AND address = ? AND uuid != ?";
    $check_stmt = $conn->prepare($check_query);
    $check_stmt->bind_param("sssi", $name, $gender, $address, $uuid);
    $check_stmt->execute();
    $check_result = $check_stmt->get_result();

    if ($check_result->num_rows > 0) {
        $_SESSION['msg'] = "Student already exists with the same name, gender, and address!";
        $_SESSION['msg_type'] = "warning";
    } else {
        $query = "UPDATE student SET name = ?, gender = ?, address = ? WHERE uuid = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("sssi", $name, $gender, $address, $uuid);

        if ($stmt->execute()) {
            $_SESSION['msg'] = "Student updated successfully!";
            $_SESSION['msg_type'] = "success";
        } else {
            $_SESSION['msg'] = "Error: " . $conn->error;
            $_SESSION['msg_type'] = "danger";
        }
    }
    
    header("Location: index.php");
} else {
    header("Location: index.php");
}

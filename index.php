<?php include("header.php"); ?>
<?php include("dbconnect.php"); ?>
<?php
session_start();

// Display message and clear from session
if (isset($_SESSION['msg'])) {
    echo "<div class='alert alert-".$_SESSION['msg_type']."'>".$_SESSION['msg']."</div>";
    unset($_SESSION['msg']);
    unset($_SESSION['msg_type']);
}

// Handle Delete
if (isset($_GET["delete"])) {
    $id = (int)$_GET["delete"];
    $check = $conn->prepare("SELECT COUNT(*) as count FROM grade WHERE student_uuid = ?");
    $check->bind_param("i", $id);
    $check->execute();
    $result = $check->get_result()->fetch_assoc();
    
    if ($result["count"] > 0) {
        echo "<div class='alert alert-warning'>Cannot delete student. It has associated grades.</div>";
    } else {
        $stmt = $conn->prepare("DELETE FROM student WHERE uuid = ?");
        $stmt->bind_param("i", $id);
        if ($stmt->execute()) echo "<div class='alert alert-success'>Student deleted successfully!</div>";
    }
}
?>
<script>
function confirmDelete(id) {
    if (confirm('Delete this student?')) window.location.href = '?delete=' + id;
}
</script>
<div class="row mb-4">
    <div class="col-md-6"><h2><i class="bi bi-people-fill"></i> Student List</h2></div>
    <div class="col-md-6 text-end">
        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addModal"><i class="bi bi-plus-circle"></i> Add Student</button>
    </div>
</div>
<div class="card"><div class="card-body">
<table class="table table-striped table-bordered table-hover">
<thead class="table-dark"><tr><th>No</th><th>Name</th><th>Gender</th><th>Address</th><th>Actions</th></tr></thead>
<tbody>
<?php
$result = mysqli_query($conn, "SELECT * FROM student ORDER BY name");
$no = 1;
while ($row = mysqli_fetch_assoc($result)) {
    $uid = $row["uuid"];
    echo "<tr><td>".$no++."</td><td>".htmlspecialchars($row["name"])."</td><td>".htmlspecialchars($row["gender"])."</td><td>".htmlspecialchars($row["address"])."</td>";
    echo "<td><button class='btn btn-warning btn-sm' data-bs-toggle='modal' data-bs-target='#e$uid'><i class='bi bi-pencil'></i></button> ";
    echo "<button class='btn btn-danger btn-sm' onclick='confirmDelete($uid)'><i class='bi bi-trash'></i></button></td></tr>";
?>
<div class="modal fade" id="e<?php echo $uid;?>"><div class="modal-dialog"><div class="modal-content">
<div class="modal-header"><h5 class="modal-title">Edit Student</h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
<form method="POST" action="update_student.php"><div class="modal-body">
<input type="hidden" name="uuid" value="<?php echo $uid;?>">
<div class="mb-3"><label class="form-label">Name</label>
<input type="text" class="form-control" name="name" value="<?php echo htmlspecialchars($row['name']);?>" required></div>
<div class="mb-3"><label class="form-label">Gender</label>
<select class="form-select" name="gender">
<option value="Male" <?php echo $row['gender']=='Male'?'selected':'';?>>Male</option>
<option value="Female" <?php echo $row['gender']=='Female'?'selected':'';?>>Female</option>
</select></div>
<div class="mb-3"><label class="form-label">Address</label>
<textarea class="form-control" name="address" rows="3"><?php echo htmlspecialchars($row['address']);?></textarea></div>
</div><div class="modal-footer">
<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
<button type="submit" class="btn btn-success" name="update_student">Update</button>
</div></form></div></div></div>
<?php } ?>
</tbody></table></div></div>
<div class="modal fade" id="addModal"><div class="modal-dialog"><div class="modal-content">
<div class="modal-header"><h5 class="modal-title">Add Student</h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
<form method="POST" action="insert_data.php"><div class="modal-body">
<div class="mb-3"><label class="form-label">Name</label>
<input type="text" class="form-control" name="name" required></div>
<div class="mb-3"><label class="form-label">Gender</label>
<select class="form-select" name="gender">
<option value="Male">Male</option>
<option value="Female">Female</option>
</select></div>
<div class="mb-3"><label class="form-label">Address</label>
<textarea class="form-control" name="address" rows="3"></textarea></div>
</div><div class="modal-footer">
<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
<button type="submit" class="btn btn-success" name="add_student">Add Student</button>
</div></form></div></div></div>
<?php include("footer.php"); ?>

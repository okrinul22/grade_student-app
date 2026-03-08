<?php include("header.php"); ?>
<?php include("dbconnect.php"); ?>

<?php
if (isset($_GET["delete"])) {
    $id = (int)$_GET["delete"];
    $check = $conn->prepare("SELECT COUNT(*) as count FROM grade WHERE school_subject_uuid = ?");
    $check->bind_param("i", $id);
    $check->execute();
    $result = $check->get_result()->fetch_assoc();
    
    if ($result["count"] > 0) {
        echo "<div class='alert alert-warning'>Cannot delete subject. It has associated grades.</div>";
    } else {
        $stmt = $conn->prepare("DELETE FROM school_subject WHERE uuid = ?");
        $stmt->bind_param("i", $id);
        if ($stmt->execute()) echo "<div class='alert alert-success'>Subject deleted successfully!</div>";
    }
}

if (isset($_POST["add_subject"])) {
    $subject_name = trim($_POST["subject_name"]);
    // Case-insensitive check
    $check = $conn->prepare("SELECT * FROM school_subject WHERE LOWER(subject_name) = LOWER(?)");
    $check->bind_param("s", $subject_name);
    $check->execute();
    if ($check->get_result()->num_rows > 0) {
        echo "<div class='alert alert-warning'>Subject already exists!</div>";
    } else {
        $stmt = $conn->prepare("INSERT INTO school_subject (subject_name) VALUES (?)");
        $stmt->bind_param("s", $subject_name);
        if ($stmt->execute()) echo "<div class='alert alert-success'>Subject added successfully!</div>";
    }
}

if (isset($_POST["update_subject"])) {
    $id = (int)$_POST["uuid"];
    $subject_name = trim($_POST["subject_name"]);
    // Case-insensitive check excluding current
    $check = $conn->prepare("SELECT * FROM school_subject WHERE LOWER(subject_name) = LOWER(?) AND uuid != ?");
    $check->bind_param("si", $subject_name, $id);
    $check->execute();
    if ($check->get_result()->num_rows > 0) {
        echo "<div class='alert alert-warning'>Subject already exists!</div>";
    } else {
        $stmt = $conn->prepare("UPDATE school_subject SET subject_name = ? WHERE uuid = ?");
        $stmt->bind_param("si", $subject_name, $id);
        if ($stmt->execute()) echo "<div class='alert alert-success'>Subject updated successfully!</div>";
    }
}
?>
<script>
function confirmDelete(id) {
    if (confirm('Delete this subject?')) window.location.href = '?delete=' + id;
}
</script>
<div class="row mb-4">
    <div class="col-md-6"><h2><i class="bi bi-book-fill"></i> Subject List</h2></div>
    <div class="col-md-6 text-end">
        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addModal"><i class="bi bi-plus-circle"></i> Add Subject</button>
    </div>
</div>
<div class="card"><div class="card-body">
<table class="table table-striped table-bordered table-hover">
<thead class="table-dark"><tr><th>No</th><th>Subject Name</th><th>Actions</th></tr></thead>
<tbody>
<?php
$result = mysqli_query($conn, "SELECT * FROM school_subject ORDER BY subject_name");
$no = 1;
while ($row = mysqli_fetch_assoc($result)) {
    $uid = $row["uuid"];
    echo "<tr><td>".$no++."</td><td>".htmlspecialchars($row["subject_name"])."</td>";
    echo "<td><button class='btn btn-warning btn-sm' data-bs-toggle='modal' data-bs-target='#e$uid'><i class='bi bi-pencil'></i></button> ";
    echo "<button class='btn btn-danger btn-sm' onclick='confirmDelete($uid)'><i class='bi bi-trash'></i></button></td></tr>";
?>
<div class="modal fade" id="e<?php echo $uid;?>"><div class="modal-dialog"><div class="modal-content">
<div class="modal-header"><h5 class="modal-title">Edit Subject</h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
<form method="POST"><div class="modal-body">
<input type="hidden" name="uuid" value="<?php echo $uid;?>">
<div class="mb-3"><label class="form-label">Subject Name</label>
<input type="text" class="form-control" name="subject_name" value="<?php echo htmlspecialchars($row['subject_name']);?>" required></div>
</div><div class="modal-footer">
<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
<button type="submit" class="btn btn-success" name="update_subject">Update</button>
</div></form></div></div></div>
<?php } ?>
</tbody></table></div></div>
<div class="modal fade" id="addModal"><div class="modal-dialog"><div class="modal-content">
<div class="modal-header"><h5 class="modal-title">Add Subject</h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
<form method="POST"><div class="modal-body">
<div class="mb-3"><label class="form-label">Subject Name</label>
<input type="text" class="form-control" name="subject_name" required></div>
</div><div class="modal-footer">
<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
<button type="submit" class="btn btn-success" name="add_subject">Add Subject</button>
</div></form></div></div></div>
<?php include("footer.php"); ?>

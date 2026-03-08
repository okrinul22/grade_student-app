<?php include("header.php"); ?>
<?php include("dbconnect.php"); ?>
<?php
if (isset($_GET["delete"])) {
    $id = (int)$_GET["delete"];
    $stmt = $conn->prepare("DELETE FROM grade WHERE uuid = ?");
    $stmt->bind_param("i", $id);
    if ($stmt->execute()) echo "<div class='alert alert-success'>Deleted!</div>";
}

if (isset($_POST["add_grade"])) {
    $student_uuid = (int)$_POST["student_uuid"];
    $subject_uuid = (int)$_POST["subject_uuid"];
    $grade_value = $_POST["grade_value"];
    
    // Check for duplicate grade (same student + subject)
    $check = $conn->prepare("SELECT * FROM grade WHERE student_uuid = ? AND school_subject_uuid = ?");
    $check->bind_param("ii", $student_uuid, $subject_uuid);
    $check->execute();
    if ($check->get_result()->num_rows > 0) {
        echo "<div class='alert alert-warning'>Grade already exists for this student and subject!</div>";
    } else {
        $stmt = $conn->prepare("INSERT INTO grade (student_uuid, school_subject_uuid, grade_value) VALUES (?, ?, ?)");
        $stmt->bind_param("iis", $student_uuid, $subject_uuid, $grade_value);
        if ($stmt->execute()) echo "<div class='alert alert-success'>Grade added successfully!</div>";
    }
}

if (isset($_POST["update_grade"])) {
    $id = (int)$_POST["uuid"];
    $student_uuid = (int)$_POST["student_uuid"];
    $subject_uuid = (int)$_POST["subject_uuid"];
    $grade_value = $_POST["grade_value"];
    
    // Check for duplicate grade (same student + subject) excluding current
    $check = $conn->prepare("SELECT * FROM grade WHERE student_uuid = ? AND school_subject_uuid = ? AND uuid != ?");
    $check->bind_param("iii", $student_uuid, $subject_uuid, $id);
    $check->execute();
    if ($check->get_result()->num_rows > 0) {
        echo "<div class='alert alert-warning'>Grade already exists for this student and subject!</div>";
    } else {
        $stmt = $conn->prepare("UPDATE grade SET student_uuid=?, school_subject_uuid=?, grade_value=? WHERE uuid=?");
        $stmt->bind_param("iisi", $student_uuid, $subject_uuid, $grade_value, $id);
        if ($stmt->execute()) echo "<div class='alert alert-success'>Grade updated successfully!</div>";
    }
}

$students = $conn->query("SELECT * FROM student ORDER BY name");
$subjects = $conn->query("SELECT * FROM school_subject ORDER BY subject_name");
?>
<script>
function confirmDelete(id) {
    if (confirm('Delete this grade?')) window.location.href = '?delete=' + id;
}
</script>

<div class="row mb-4">
    <div class="col-md-6"><h2><i class="bi bi-award-fill"></i> Grade List</h2></div>
    <div class="col-md-6 text-end">
        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addModal"><i class="bi bi-plus-circle"></i> Add Grade</button>
    </div>
</div>
<div class="card"><div class="card-body">
<table class="table table-striped table-bordered table-hover">
<thead class="table-dark"><tr><th>No</th><th>Student</th><th>Subject</th><th>Grade</th><th>Actions</th></tr></thead>
<tbody>
<?php
$r = mysqli_query($conn, "SELECT g.uuid, g.grade_value, g.student_uuid, g.school_subject_uuid, s.name sn, sub.subject_name subn FROM grade g JOIN student s ON g.student_uuid=s.uuid JOIN school_subject sub ON g.school_subject_uuid=sub.uuid ORDER BY s.name, sub.subject_name");
$n = 1;
while ($row = mysqli_fetch_assoc($r)) {
    $gc = "bg-danger";
    if ($row["grade_value"]=="A") $gc="bg-success";
    elseif ($row["grade_value"]=="B") $gc="bg-primary";
    elseif ($row["grade_value"]=="C") $gc="bg-warning text-dark";
    elseif ($row["grade_value"]=="D") $gc="bg-orange";
    $uid = $row["uuid"];
    echo "<tr><td>".$n++."</td><td>".htmlspecialchars($row["sn"])."</td><td>".htmlspecialchars($row["subn"])."</td>";
    echo "<td><span class='badge $gc'>".$row["grade_value"]."</span></td>";
    echo "<td><button class='btn btn-warning btn-sm' data-bs-toggle='modal' data-bs-target='#e$uid'><i class='bi bi-pencil'></i></button> ";
    echo "<button class='btn btn-danger btn-sm' onclick='confirmDelete($uid)'><i class='bi bi-trash'></i></button></td></tr>";
?>
<div class="modal fade" id="e<?php echo $uid;?>"><div class="modal-dialog"><div class="modal-content">
<div class="modal-header"><h5 class="modal-title">Edit Grade</h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
<form method="POST"><div class="modal-body">
<input type="hidden" name="uuid" value="<?php echo $uid;?>">
<div class="mb-3"><label class="form-label">Student</label>
<select class="form-select" name="student_uuid" required>
<?php $students->data_seek(0); while($s=$students->fetch_assoc()){ $sel=($s["uuid"]==$row["student_uuid"])?"selected":""; echo "<option value='".$s["uuid"]."' $sel>".htmlspecialchars($s["name"])."</option>"; }?>
</select></div>
<div class="mb-3"><label class="form-label">Subject</label>
<select class="form-select" name="subject_uuid" required>
<?php $subjects->data_seek(0); while($sb=$subjects->fetch_assoc()){ $sel=($sb["uuid"]==$row["school_subject_uuid"])?"selected":""; echo "<option value='".$sb["uuid"]."' $sel>".htmlspecialchars($sb["subject_name"])."</option>"; }?>
</select></div>
<div class="mb-3"><label class="form-label">Grade</label>
<select class="form-select" name="grade_value" required>
<?php foreach(["A","B","C","D","E"] as $g){ $sel=($g==$row["grade_value"])?"selected":""; echo "<option value='$g' $sel>$g</option>"; }?>
</select></div>
</div><div class="modal-footer">
<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
<button type="submit" class="btn btn-success" name="update_grade">Update</button>
</div></form></div></div></div>
<?php } ?>
</tbody></table></div></div>

<div class="modal fade" id="addModal"><div class="modal-dialog"><div class="modal-content">
<div class="modal-header"><h5 class="modal-title">Add Grade</h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
<form method="POST"><div class="modal-body">
<div class="mb-3"><label class="form-label">Student</label>
<select class="form-select" name="student_uuid" required>
<option value="">Select Student</option>
<?php $students->data_seek(0); while($s=$students->fetch_assoc()){ echo "<option value='".$s["uuid"]."'>".htmlspecialchars($s["name"])."</option>"; }?>
</select></div>
<div class="mb-3"><label class="form-label">Subject</label>
<select class="form-select" name="subject_uuid" required>
<option value="">Select Subject</option>
<?php $subjects->data_seek(0); while($sb=$subjects->fetch_assoc()){ echo "<option value='".$sb["uuid"]."'>".htmlspecialchars($sb["subject_name"])."</option>"; }?>
</select></div>
<div class="mb-3"><label class="form-label">Grade</label>
<select class="form-select" name="grade_value" required>
<option value="">Select Grade</option>
<option value="A">A</option><option value="B">B</option><option value="C">C</option><option value="D">D</option><option value="E">E</option>
</select></div>
</div><div class="modal-footer">
<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
<button type="submit" class="btn btn-success" name="add_grade">Add Grade</button>
</div></form></div></div></div>
<?php include("footer.php"); ?>

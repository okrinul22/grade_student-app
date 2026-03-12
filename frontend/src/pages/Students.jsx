import { useEffect, useState } from "react"
import API_URL from "../config/api"

function Students() {
  const [students, setStudents] = useState([])
  const [name, setName] = useState("")
  const [gender, setGender] = useState("")
  const [address, setAddress] = useState("")
  const [editUuid, setEditUuid] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  async function loadStudents() {
    try {
      const res = await fetch(`${API_URL}/students`)
      const data = await res.json()
      setStudents(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    loadStudents()
  }, [])

  function openModal(student = null) {
    if (student) {
      setName(student.name)
      setGender(student.gender)
      setAddress(student.address)
      setEditUuid(student.uuid)
    } else {
      setName("")
      setGender("")
      setAddress("")
      setEditUuid(null)
    }
    setShowModal(true)
  }

  function closeModal() {
    setName("")
    setGender("")
    setAddress("")
    setEditUuid(null)
    setShowModal(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!name || !gender || !address) {
      alert("Please fill in all fields")
      return
    }

    if (editUuid) {
      await fetch(`${API_URL}/students/${editUuid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, gender, address })
      })
    } else {
      await fetch(`${API_URL}/students`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, gender, address })
      })
    }

    closeModal()
    loadStudents()
  }

  async function deleteStudent(uuid) {
    if (window.confirm("Are you sure you want to delete this student?")) {
      await fetch(`${API_URL}/students/${uuid}`, { method: "DELETE" })
      loadStudents()
    }
  }

  const filteredStudents = students.filter(s =>
    s.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.gender?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.address?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Students</h2>
          <p className="text-muted mb-0">Manage student records</p>
        </div>
        <button className="btn btn-primary" onClick={() => openModal()}>
          <i className="bi bi-plus-lg me-2"></i>
          Add Student
        </button>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="rounded-circle bg-primary bg-opacity-10 p-3 me-3">
                  <i className="bi bi-people-fill text-primary fs-4"></i>
                </div>
                <div>
                  <h4 className="mb-0">{students.length}</h4>
                  <small className="text-muted">Total Students</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="rounded-circle bg-success bg-opacity-10 p-3 me-3">
                  <i className="bi bi-gender-male text-success fs-4"></i>
                </div>
                <div>
                  <h4 className="mb-0">{students.filter(s => s.gender === "Male").length}</h4>
                  <small className="text-muted">Male Students</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="rounded-circle bg-danger bg-opacity-10 p-3 me-3">
                  <i className="bi bi-gender-female text-danger fs-4"></i>
                </div>
                <div>
                  <h4 className="mb-0">{students.filter(s => s.gender === "Female").length}</h4>
                  <small className="text-muted">Female Students</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="rounded-circle bg-warning bg-opacity-10 p-3 me-3">
                  <i className="bi bi-geo-alt-fill text-warning fs-4"></i>
                </div>
                <div>
                  <h4 className="mb-0">{[...new Set(students.map(s => s.address))].length}</h4>
                  <small className="text-muted">Locations</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text bg-white">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6 text-end">
              <span className="text-muted">
                Showing {filteredStudents.length} of {students.length} students
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="border-0 px-4 py-3">#</th>
                  <th className="border-0 py-3">Name</th>
                  <th className="border-0 py-3">Gender</th>
                  <th className="border-0 py-3">Address</th>
                  <th className="border-0 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-5">
                      <i className="bi bi-inbox fs-1 text-muted d-block mb-2"></i>
                      <span className="text-muted">No students found</span>
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((s, index) => (
                    <tr key={s.uuid}>
                      <td className="px-4">{index + 1}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2" style={{ width: "36px", height: "36px" }}>
                            {s.name?.charAt(0).toUpperCase()}
                          </div>
                          <strong>{s.name}</strong>
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${s.gender === "Male" ? "bg-primary" : "bg-danger"}`}>
                          {s.gender}
                        </span>
                      </td>
                      <td>
                        <i className="bi bi-geo-alt text-muted me-1"></i>
                        {s.address}
                      </td>
                      <td className="text-center">
                        <button
                          className="btn btn-sm btn-outline-primary me-1"
                          onClick={() => openModal(s)}
                          title="Edit"
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => deleteStudent(s.uuid)}
                          title="Delete"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content border-0 shadow">
                <div className="modal-header border-0 pb-0">
                  <h5 className="modal-title">
                    {editUuid ? "Edit Student" : "Add New Student"}
                  </h5>
                  <button type="button" className="btn-close" onClick={closeModal}></button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body pt-0">
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter student name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Gender</label>
                      <select
                        className="form-select"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Address</label>
                      <textarea
                        className="form-control"
                        placeholder="Enter address"
                        rows="3"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                  <div className="modal-footer border-0 pt-0">
                    <button type="button" className="btn btn-secondary" onClick={closeModal}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {editUuid ? "Update Student" : "Add Student"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Students

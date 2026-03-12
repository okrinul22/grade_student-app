import { useEffect, useState } from "react"
import API_URL from "../config/api"

function Subjects() {
  const [subjects, setSubjects] = useState([])
  const [subjectName, setSubjectName] = useState("")
  const [editUuid, setEditUuid] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  async function loadSubjects() {
    try {
      const res = await fetch(`${API_URL}/subjects`)
      const data = await res.json()
      setSubjects(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    loadSubjects()
  }, [])

  function openModal(subject = null) {
    if (subject) {
      setSubjectName(subject.subject_name)
      setEditUuid(subject.uuid)
    } else {
      setSubjectName("")
      setEditUuid(null)
    }
    setShowModal(true)
  }

  function closeModal() {
    setSubjectName("")
    setEditUuid(null)
    setShowModal(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!subjectName) {
      alert("Please enter subject name")
      return
    }

    if (editUuid) {
      await fetch(`${API_URL}/subjects/${editUuid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject_name: subjectName })
      })
    } else {
      await fetch(`${API_URL}/subjects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject_name: subjectName })
      })
    }

    closeModal()
    loadSubjects()
  }

  async function deleteSubject(uuid) {
    if (window.confirm("Are you sure you want to delete this subject?")) {
      await fetch(`${API_URL}/subjects/${uuid}`, { method: "DELETE" })
      loadSubjects()
    }
  }

  const filteredSubjects = subjects.filter(s =>
    s.subject_name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const colors = ["primary", "success", "danger", "warning", "info", "secondary"]

  return (
    <div>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Subjects</h2>
          <p className="text-muted mb-0">Manage school subjects</p>
        </div>
        <button className="btn btn-primary" onClick={() => openModal()}>
          <i className="bi bi-plus-lg me-2"></i>
          Add Subject
        </button>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="rounded-circle bg-primary bg-opacity-10 p-3 me-3">
                  <i className="bi bi-book-fill text-primary fs-4"></i>
                </div>
                <div>
                  <h4 className="mb-0">{subjects.length}</h4>
                  <small className="text-muted">Total Subjects</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="rounded-circle bg-success bg-opacity-10 p-3 me-3">
                  <i className="bi bi-check-circle-fill text-success fs-4"></i>
                </div>
                <div>
                  <h4 className="mb-0">{subjects.length}</h4>
                  <small className="text-muted">Active Subjects</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="rounded-circle bg-info bg-opacity-10 p-3 me-3">
                  <i className="bi bi-graph-up text-info fs-4"></i>
                </div>
                <div>
                  <h4 className="mb-0">All</h4>
                  <small className="text-muted">Categories</small>
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
                  placeholder="Search subjects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6 text-end">
              <span className="text-muted">
                Showing {filteredSubjects.length} of {subjects.length} subjects
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Subject Cards Grid */}
      <div className="row mb-4">
        {filteredSubjects.map((s, index) => (
          <div className="col-md-3 mb-3" key={s.uuid}>
            <div className={`card border-0 shadow-sm border-start border-${colors[index % colors.length]} border-4`}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 className="mb-1">{s.subject_name}</h6>
                    <small className="text-muted">ID: {s.uuid}</small>
                  </div>
                  <div className="dropdown">
                    <button className="btn btn-sm btn-link text-muted p-0" data-bs-toggle="dropdown">
                      <i className="bi bi-three-dots-vertical"></i>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <button className="dropdown-item" onClick={() => openModal(s)}>
                          <i className="bi bi-pencil me-2"></i>Edit
                        </button>
                      </li>
                      <li>
                        <button className="dropdown-item text-danger" onClick={() => deleteSubject(s.uuid)}>
                          <i className="bi bi-trash me-2"></i>Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white border-0 py-3">
          <h6 className="mb-0">All Subjects</h6>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="border-0 px-4 py-3">#</th>
                  <th className="border-0 py-3">Subject Name</th>
                  <th className="border-0 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubjects.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center py-5">
                      <i className="bi bi-inbox fs-1 text-muted d-block mb-2"></i>
                      <span className="text-muted">No subjects found</span>
                    </td>
                  </tr>
                ) : (
                  filteredSubjects.map((s, index) => (
                    <tr key={s.uuid}>
                      <td className="px-4">{index + 1}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className={`rounded-circle bg-${colors[index % colors.length]} bg-opacity-10 p-2 me-2`}>
                            <i className={`bi bi-book text-${colors[index % colors.length]}`}></i>
                          </div>
                          <strong>{s.subject_name}</strong>
                        </div>
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
                          onClick={() => deleteSubject(s.uuid)}
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
                    {editUuid ? "Edit Subject" : "Add New Subject"}
                  </h5>
                  <button type="button" className="btn-close" onClick={closeModal}></button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body pt-0">
                    <div className="mb-3">
                      <label className="form-label">Subject Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter subject name"
                        value={subjectName}
                        onChange={(e) => setSubjectName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="modal-footer border-0 pt-0">
                    <button type="button" className="btn btn-secondary" onClick={closeModal}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {editUuid ? "Update Subject" : "Add Subject"}
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

export default Subjects

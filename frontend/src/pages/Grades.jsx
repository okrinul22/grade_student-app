import { useEffect, useState } from "react"
import API_URL from "../config/api"

function Grades() {
  const [grades, setGrades] = useState([])
  const [students, setStudents] = useState([])
  const [subjects, setSubjects] = useState([])

  const [studentUuid, setStudentUuid] = useState("")
  const [subjectUuid, setSubjectUuid] = useState("")
  const [score, setScore] = useState("")

  const [showModal, setShowModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStudent, setFilterStudent] = useState("")
  const [filterSubject, setFilterSubject] = useState("")
  const [filterGrade, setFilterGrade] = useState("")

  async function loadData() {
    try {
      const g = await fetch(`${API_URL}/grades`)
      const s = await fetch(`${API_URL}/students`)
      const sub = await fetch(`${API_URL}/subjects`)

      setGrades(await g.json())
      setStudents(await s.json())
      setSubjects(await sub.json())
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  function openModal() {
    setStudentUuid("")
    setSubjectUuid("")
    setScore("")
    setShowModal(true)
  }

  function closeModal() {
    setStudentUuid("")
    setSubjectUuid("")
    setScore("")
    setShowModal(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!studentUuid || !subjectUuid || !score) {
      alert("Please select student, subject, and enter score")
      return
    }

    await fetch(`${API_URL}/grades`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        student_uuid: parseInt(studentUuid),
        school_subject_uuid: parseInt(subjectUuid),
        score: score
      })
    })

    closeModal()
    loadData()
  }

  async function deleteGrade(uuid) {
    if (window.confirm("Are you sure you want to delete this grade?")) {
      await fetch(`${API_URL}/grades/${uuid}`, { method: "DELETE" })
      loadData()
    }
  }

  // Filter grades
  const filteredGrades = grades.filter(g => {
    const matchSearch =
      g.student?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.subject?.subject_name?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchStudent = !filterStudent || g.student_uuid === parseInt(filterStudent)
    const matchSubject = !filterSubject || g.school_subject_uuid === parseInt(filterSubject)
    const matchGrade = !filterGrade || g.grade_value === filterGrade

    return matchSearch && matchStudent && matchSubject && matchGrade
  })

  // Calculate average score
  function getGradeValue(grade) {
    const gradeMap = { 'A': 4, 'B': 3, 'C': 2, 'D': 1, 'E': 0 }
    return gradeMap[grade?.toUpperCase()] || 0
  }

  function getAverageScore() {
    if (filteredGrades.length === 0) return 0
    const total = filteredGrades.reduce((sum, g) => sum + getGradeValue(g.grade_value), 0)
    return (total / filteredGrades.length).toFixed(2)
  }

  function getGradeBadgeClass(grade) {
    switch (grade?.toUpperCase()) {
      case 'A': return 'bg-success'
      case 'B': return 'bg-primary'
      case 'C': return 'bg-warning'
      case 'D': return 'bg-orange'
      case 'E': return 'bg-danger'
      default: return 'bg-secondary'
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Grades</h2>
          <p className="text-muted mb-0">Manage student grades</p>
        </div>
        <button className="btn btn-primary" onClick={openModal}>
          <i className="bi bi-plus-lg me-2"></i>
          Add Grade
        </button>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="rounded-circle bg-primary bg-opacity-10 p-3 me-3">
                  <i className="bi bi-clipboard-data-fill text-primary fs-4"></i>
                </div>
                <div>
                  <h4 className="mb-0">{grades.length}</h4>
                  <small className="text-muted">Total Grades</small>
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
                  <i className="bi bi-trophy-fill text-success fs-4"></i>
                </div>
                <div>
                  <h4 className="mb-0">{grades.filter(g => g.grade_value === 'A').length}</h4>
                  <small className="text-muted">Grade A</small>
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
                  <i className="bi bi-calculator-fill text-warning fs-4"></i>
                </div>
                <div>
                  <h4 className="mb-0">{getAverageScore()}</h4>
                  <small className="text-muted">Average GPA</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="rounded-circle bg-info bg-opacity-10 p-3 me-3">
                  <i className="bi bi-person-check-fill text-info fs-4"></i>
                </div>
                <div>
                  <h4 className="mb-0">{[...new Set(grades.map(g => g.student_uuid))].length}</h4>
                  <small className="text-muted">Students Graded</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-3">
              <label className="form-label small text-muted">Search</label>
              <div className="input-group">
                <span className="input-group-text bg-white">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-3">
              <label className="form-label small text-muted">Filter by Student</label>
              <select
                className="form-select"
                value={filterStudent}
                onChange={(e) => setFilterStudent(e.target.value)}
              >
                <option value="">All Students</option>
                {students.map(s => (
                  <option key={s.uuid} value={s.uuid}>{s.name}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label small text-muted">Filter by Subject</label>
              <select
                className="form-select"
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
              >
                <option value="">All Subjects</option>
                {subjects.map(s => (
                  <option key={s.uuid} value={s.uuid}>{s.subject_name}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label small text-muted">Filter by Grade</label>
              <select
                className="form-select"
                value={filterGrade}
                onChange={(e) => setFilterGrade(e.target.value)}
              >
                <option value="">All Grades</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
              </select>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12 d-flex justify-content-between align-items-center">
              <span className="text-muted">
                Showing {filteredGrades.length} of {grades.length} grades
              </span>
              {(filterStudent || filterSubject || filterGrade || searchTerm) && (
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => {
                    setSearchTerm("")
                    setFilterStudent("")
                    setFilterSubject("")
                    setFilterGrade("")
                  }}
                >
                  <i className="bi bi-x-circle me-1"></i>
                  Clear Filters
                </button>
              )}
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
                  <th className="border-0 py-3">Student</th>
                  <th className="border-0 py-3">Subject</th>
                  <th className="border-0 py-3 text-center">Grade</th>
                  <th className="border-0 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredGrades.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-5">
                      <i className="bi bi-inbox fs-1 text-muted d-block mb-2"></i>
                      <span className="text-muted">No grades found</span>
                    </td>
                  </tr>
                ) : (
                  filteredGrades.map((g, index) => (
                    <tr key={g.uuid}>
                      <td className="px-4">{index + 1}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2" style={{ width: "36px", height: "36px" }}>
                            {g.student?.name?.charAt(0).toUpperCase() || "?"}
                          </div>
                          <div>
                            <strong>{g.student?.name || "-"}</strong>
                            <br />
                            <small className="text-muted">ID: {g.student_uuid}</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <i className="bi bi-book text-muted me-2"></i>
                          {g.subject?.subject_name || "-"}
                        </div>
                      </td>
                      <td className="text-center">
                        <span className={`badge ${getGradeBadgeClass(g.grade_value)} fs-6 px-3 py-2`}>
                          {g.grade_value}
                        </span>
                      </td>
                      <td className="text-center">
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => deleteGrade(g.uuid)}
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
                  <h5 className="modal-title">Add New Grade</h5>
                  <button type="button" className="btn-close" onClick={closeModal}></button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body pt-0">
                    <div className="mb-3">
                      <label className="form-label">Student</label>
                      <select
                        className="form-select"
                        value={studentUuid}
                        onChange={e => setStudentUuid(e.target.value)}
                      >
                        <option value="">Select Student</option>
                        {students.map(s => (
                          <option key={s.uuid} value={s.uuid}>{s.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Subject</label>
                      <select
                        className="form-select"
                        value={subjectUuid}
                        onChange={e => setSubjectUuid(e.target.value)}
                      >
                        <option value="">Select Subject</option>
                        {subjects.map(s => (
                          <option key={s.uuid} value={s.uuid}>{s.subject_name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Grade</label>
                      <select
                        className="form-select"
                        value={score}
                        onChange={e => setScore(e.target.value)}
                      >
                        <option value="">Select Grade</option>
                        <option value="A">A - Excellent</option>
                        <option value="B">B - Good</option>
                        <option value="C">C - Average</option>
                        <option value="D">D - Below Average</option>
                        <option value="E">E - Poor</option>
                      </select>
                    </div>
                  </div>
                  <div className="modal-footer border-0 pt-0">
                    <button type="button" className="btn btn-secondary" onClick={closeModal}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Add Grade
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

export default Grades

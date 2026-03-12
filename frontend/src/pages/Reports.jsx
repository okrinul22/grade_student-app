import { useEffect, useState } from "react"
import API_URL from "../config/api"

function Reports() {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStudent, setSelectedStudent] = useState(null)

  async function loadReports() {
    try {
      setLoading(true)
      const res = await fetch(`${API_URL}/reports`)
      const data = await res.json()
      setReports(data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadReports()
  }, [])

  // Filter reports
  const filteredReports = reports.filter(r =>
    r.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.address?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Sort by average (highest first)
  const sortedReports = [...filteredReports].sort((a, b) => parseFloat(b.average) - parseFloat(a.average))

  // Class statistics
  function getClassStats() {
    if (reports.length === 0) return { classAverage: 0, highestAverage: 0, lowestAverage: 0, totalStudents: 0 }

    const averages = reports.map(r => parseFloat(r.average))
    return {
      classAverage: (averages.reduce((a, b) => a + b, 0) / averages.length).toFixed(2),
      highestAverage: Math.max(...averages).toFixed(2),
      lowestAverage: Math.min(...averages).toFixed(2),
      totalStudents: reports.length
    }
  }

  const stats = getClassStats()

  function getGradeBadgeClass(grade) {
    switch (grade?.toUpperCase()) {
      case 'A': return 'bg-success'
      case 'B': return 'bg-primary'
      case 'C': return 'bg-warning text-dark'
      case 'D': return 'bg-orange'
      case 'E': return 'bg-danger'
      default: return 'bg-secondary'
    }
  }

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Loading reports...</p>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Reports</h2>
          <p className="text-muted mb-0">Student grade reports and analytics</p>
        </div>
        <button className="btn btn-outline-primary" onClick={() => window.print()}>
          <i className="bi bi-printer me-2"></i>
          Print Report
        </button>
      </div>

      {/* Class Statistics */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm bg-primary text-white">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="rounded-circle bg-white bg-opacity-25 p-3 me-3">
                  <i className="bi bi-people-fill fs-4"></i>
                </div>
                <div>
                  <h4 className="mb-0">{stats.totalStudents}</h4>
                  <small className="text-white-50">Total Students</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm bg-success text-white">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="rounded-circle bg-white bg-opacity-25 p-3 me-3">
                  <i className="bi bi-graph-up-arrow fs-4"></i>
                </div>
                <div>
                  <h4 className="mb-0">{stats.classAverage}</h4>
                  <small className="text-white-50">Class Average GPA</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm bg-warning">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="rounded-circle bg-white bg-opacity-50 p-3 me-3">
                  <i className="bi bi-trophy-fill fs-4 text-warning"></i>
                </div>
                <div>
                  <h4 className="mb-0">{stats.highestAverage}</h4>
                  <small>Highest Average</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm bg-danger text-white">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="rounded-circle bg-white bg-opacity-25 p-3 me-3">
                  <i className="bi bi-graph-down-arrow fs-4"></i>
                </div>
                <div>
                  <h4 className="mb-0">{stats.lowestAverage}</h4>
                  <small className="text-white-50">Lowest Average</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Student List with Rankings */}
        <div className="col-md-8 mb-4">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 py-3">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <h6 className="mb-0">Student Rankings</h6>
                </div>
                <div className="col-md-6">
                  <div className="input-group input-group-sm">
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
              </div>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th className="border-0 px-4 py-3">Rank</th>
                      <th className="border-0 py-3">Student</th>
                      <th className="border-0 py-3 text-center">Subjects</th>
                      <th className="border-0 py-3 text-center">Average GPA</th>
                      <th className="border-0 py-3 text-center">Final Grade</th>
                      <th className="border-0 py-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedReports.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center py-5">
                          <i className="bi bi-inbox fs-1 text-muted d-block mb-2"></i>
                          <span className="text-muted">No students found</span>
                        </td>
                      </tr>
                    ) : (
                      sortedReports.map((student, index) => (
                        <tr key={student.uuid} className={selectedStudent?.uuid === student.uuid ? "table-active" : ""}>
                          <td className="px-4">
                            {index === 0 && <span className="badge bg-warning text-dark me-2"><i className="bi bi-trophy-fill"></i></span>}
                            {index === 1 && <span className="badge bg-secondary me-2">2nd</span>}
                            {index === 2 && <span className="badge bg-danger me-2">3rd</span>}
                            {index > 2 && <span className="text-muted">{index + 1}</span>}
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2" style={{ width: "36px", height: "36px" }}>
                                {student.name?.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <strong>{student.name}</strong>
                                <br />
                                <small className="text-muted">{student.address}</small>
                              </div>
                            </div>
                          </td>
                          <td className="text-center">{student.subjects?.length || 0}</td>
                          <td className="text-center">
                            <strong>{student.average}</strong>
                          </td>
                          <td className="text-center">
                            <span className={`badge ${getGradeBadgeClass(student.averageLetter)} px-3 py-2`}>
                              {student.averageLetter}
                            </span>
                          </td>
                          <td className="text-center">
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => setSelectedStudent(student)}
                            >
                              <i className="bi bi-eye"></i>
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
        </div>

        {/* Selected Student Detail */}
        <div className="col-md-4">
          {selectedStudent ? (
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-primary text-white border-0 py-3">
                <div className="d-flex justify-content-between align-items-center">
                  <h6 className="mb-0">Student Report Card</h6>
                  <button
                    className="btn btn-sm btn-outline-light"
                    onClick={() => setSelectedStudent(null)}
                  >
                    <i className="bi bi-x"></i>
                  </button>
                </div>
              </div>
              <div className="card-body">
                {/* Student Info */}
                <div className="text-center mb-4">
                  <div className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center mb-2" style={{ width: "64px", height: "64px", fontSize: "24px" }}>
                    {selectedStudent.name?.charAt(0).toUpperCase()}
                  </div>
                  <h5 className="mb-1">{selectedStudent.name}</h5>
                  <p className="text-muted mb-0">
                    <i className="bi bi-geo-alt me-1"></i>
                    {selectedStudent.address}
                  </p>
                  <span className={`badge ${selectedStudent.gender === "Male" ? "bg-primary" : "bg-danger"} mt-2`}>
                    {selectedStudent.gender}
                  </span>
                </div>

                {/* Grade Summary */}
                <div className="bg-light rounded p-3 mb-3">
                  <div className="row text-center">
                    <div className="col-6 border-end">
                      <h4 className="mb-0">{selectedStudent.average}</h4>
                      <small className="text-muted">Average GPA</small>
                    </div>
                    <div className="col-6">
                      <span className={`badge ${getGradeBadgeClass(selectedStudent.averageLetter)} fs-5 px-3 py-2`}>
                        {selectedStudent.averageLetter}
                      </span>
                      <br />
                      <small className="text-muted">Final Grade</small>
                    </div>
                  </div>
                </div>

                {/* Subject Grades */}
                <h6 className="text-muted mb-3">Subject Grades</h6>
                <ul className="list-group list-group-flush">
                  {selectedStudent.subjects?.map((sg, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center px-0">
                      <span>
                        <i className="bi bi-book text-muted me-2"></i>
                        {sg.subject}
                      </span>
                      {sg.score !== '-' ? (
                        <span className={`badge ${getGradeBadgeClass(sg.score)}`}>{sg.score}</span>
                      ) : (
                        <span className="text-muted">-</span>
                      )}
                    </li>
                  ))}
                  {(!selectedStudent.subjects || selectedStudent.subjects.length === 0) && (
                    <li className="list-group-item text-center text-muted px-0">
                      No grades recorded
                    </li>
                  )}
                </ul>
              </div>
            </div>
          ) : (
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center py-5">
                <i className="bi bi-person-badge fs-1 text-muted d-block mb-3"></i>
                <h6>Select a Student</h6>
                <p className="text-muted small">
                  Click on a student from the list to view their detailed report card
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Reports

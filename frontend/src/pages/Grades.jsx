import { useEffect, useState } from "react"

function Grades() {

  const [grades, setGrades] = useState([])
  const [students, setStudents] = useState([])
  const [subjects, setSubjects] = useState([])

  const [studentUuid, setStudentUuid] = useState("")
  const [subjectUuid, setSubjectUuid] = useState("")
  const [score, setScore] = useState("")

  async function loadData() {
    try {
      const g = await fetch("http://localhost:3000/grades")
      const s = await fetch("http://localhost:3000/students")
      const sub = await fetch("http://localhost:3000/subjects")

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

  async function addGrade() {
    if (!studentUuid || !subjectUuid || !score) {
      alert("Please select student, subject, and enter score")
      return
    }

    await fetch("http://localhost:3000/grades", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        student_uuid: parseInt(studentUuid),
        school_subject_uuid: parseInt(subjectUuid),
        score: score
      })
    })

    setStudentUuid("")
    setSubjectUuid("")
    setScore("")
    loadData()
  }

  async function deleteGrade(uuid) {
    await fetch(`http://localhost:3000/grades/${uuid}`, { method: "DELETE" })
    loadData()
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Grades</h2>

      <div style={{ marginBottom: "20px" }}>
        <select value={studentUuid} onChange={e => setStudentUuid(e.target.value)}>
          <option value="">Select Student</option>
          {students.map(s => (
            <option key={s.uuid} value={s.uuid}>{s.name}</option>
          ))}
        </select>

        <select value={subjectUuid} onChange={e => setSubjectUuid(e.target.value)}>
          <option value="">Select Subject</option>
          {subjects.map(s => (
            <option key={s.uuid} value={s.uuid}>{s.subject_name}</option>
          ))}
        </select>

        <input
          placeholder="Score (A/B/C/D/E)"
          value={score}
          onChange={e => setScore(e.target.value)}
          maxLength={1}
          style={{ width: "120px" }}
        />

        <button onClick={addGrade}>Add Grade</button>
      </div>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Student</th>
            <th>Subject</th>
            <th>Score</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {grades.length === 0 && (
            <tr><td colSpan="4">No Data</td></tr>
          )}
          {grades.map(g => (
            <tr key={g.uuid}>
              <td>{g.student?.name || "-"}</td>
              <td>{g.subject?.subject_name || "-"}</td>
              <td>{g.grade_value}</td>
              <td>
                <button onClick={() => deleteGrade(g.uuid)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Grades

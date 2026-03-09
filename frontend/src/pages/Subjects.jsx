import { useEffect, useState } from "react"

function Subjects() {

  const [subjects, setSubjects] = useState([])
  const [subjectName, setSubjectName] = useState("")
  const [editUuid, setEditUuid] = useState(null)

  async function loadSubjects() {
    try {
      const res = await fetch("http://localhost:3000/subjects")
      const data = await res.json()
      setSubjects(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    loadSubjects()
  }, [])

  async function handleSubmit() {
    if (editUuid) {
      await fetch(`http://localhost:3000/subjects/${editUuid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject_name: subjectName })
      })
    } else {
      await fetch("http://localhost:3000/subjects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject_name: subjectName })
      })
    }

    setSubjectName("")
    setEditUuid(null)
    loadSubjects()
  }

  async function deleteSubject(uuid) {
    await fetch(`http://localhost:3000/subjects/${uuid}`, { method: "DELETE" })
    loadSubjects()
  }

  function editSubject(subject) {
    setSubjectName(subject.subject_name)
    setEditUuid(subject.uuid)
  }

  function cancelEdit() {
    setSubjectName("")
    setEditUuid(null)
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Subjects</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Subject Name"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
        />
        <button onClick={handleSubmit}>{editUuid ? "Update" : "Add"}</button>
        {editUuid && <button onClick={cancelEdit}>Cancel</button>}
      </div>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Subject Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subjects.length === 0 && (
            <tr><td colSpan="3">No Data</td></tr>
          )}
          {subjects.map((s) => (
            <tr key={s.uuid}>
              <td>{s.uuid}</td>
              <td>{s.subject_name}</td>
              <td>
                <button onClick={() => editSubject(s)}>Edit</button>
                <button onClick={() => deleteSubject(s.uuid)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Subjects

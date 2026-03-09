import { useEffect, useState } from "react"

function App() {

  const [students,setStudents] = useState([])

  const [name,setName] = useState("")
  const [gender,setGender] = useState("")
  const [address,setAddress] = useState("")

  // Edit mode state
  const [editUuid, setEditUuid] = useState(null)

  async function loadStudents(){
    try{
      const res = await fetch("http://localhost:3000/students")
      const data = await res.json()
      console.log(data)
      setStudents(data)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    loadStudents()
  },[])

  // Add or Update student
  async function handleSubmit(){
    if (editUuid) {
      // Update existing student
      await fetch(`http://localhost:3000/students/${editUuid}`,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          name,
          gender,
          address
        })
      })
    } else {
      // Add new student
      await fetch("http://localhost:3000/students",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          name,
          gender,
          address
        })
      })
    }

    setName("")
    setGender("")
    setAddress("")
    setEditUuid(null)

    loadStudents()
  }

  // Delete student
  async function deleteStudent(uuid){
    await fetch(`http://localhost:3000/students/${uuid}`,{
      method:"DELETE"
    })
    loadStudents()
  }

  // Edit student - populate form with student data
  function editStudent(student){
    setName(student.name)
    setGender(student.gender)
    setAddress(student.address)
    setEditUuid(student.uuid)
  }

  // Cancel edit
  function cancelEdit(){
    setName("")
    setGender("")
    setAddress("")
    setEditUuid(null)
  }

  return (

    <div style={{padding:"40px"}}>

      <h1>Student Exercise System</h1>

      <div style={{marginBottom:"20px"}}>

        <input
          placeholder="name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          placeholder="gender"
          value={gender}
          onChange={(e)=>setGender(e.target.value)}
        />

        <input
          placeholder="address"
          value={address}
          onChange={(e)=>setAddress(e.target.value)}
        />

        <button onClick={handleSubmit}>
          {editUuid ? "Update Student" : "Add Student"}
        </button>

        {editUuid && (
          <button onClick={cancelEdit}>Cancel</button>
        )}

      </div>

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {students.length === 0 && (
            <tr>
              <td colSpan="4">No Data</td>
            </tr>
          )}

          {students.map((s)=>(
            <tr key={s.uuid}>
              <td>{s.name}</td>
              <td>{s.gender}</td>
              <td>{s.address}</td>
              <td>
                <button onClick={()=>editStudent(s)}>Edit</button>
                <button onClick={()=>deleteStudent(s.uuid)}>Delete</button>
              </td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  )
}

export default App

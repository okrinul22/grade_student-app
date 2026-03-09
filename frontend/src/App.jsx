import { useEffect, useState } from "react"

function App() {

  const [students,setStudents] = useState([])

  const [name,setName] = useState("")
  const [gender,setGender] = useState("")
  const [address,setAddress] = useState("")

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

  async function addStudent(){
    
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
    

    setName("")
    setGender("")
    setAddress("")

    loadStudents()
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

        <button onClick={addStudent}>
          Add Student
        </button>

      </div>

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Address</th>
          </tr>
        </thead>

        <tbody>

          {students.length === 0 && (
            <tr>
              <td colSpan="3">No Data</td>
            </tr>
          )}

          {students.map((s)=>(
            <tr key={s.uuid}>
              <td>{s.name}</td>
              <td>{s.gender}</td>
              <td>{s.address}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  )
}

export default App
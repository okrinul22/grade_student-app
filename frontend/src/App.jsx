import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom"
import Students from "./pages/Students"
import Subjects from "./pages/Subjects"
import Grades from "./pages/Grades"

function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: "20px" }}>
        <h1>Student Exercise System</h1>

        <nav style={{ marginBottom: "20px" }}>
          <NavLink
            to="/"
            style={({ isActive }) => ({
              marginRight: "15px",
              fontWeight: isActive ? "bold" : "normal",
              textDecoration: isActive ? "underline" : "none"
            })}
          >
            Students
          </NavLink>
          <NavLink
            to="/subjects"
            style={({ isActive }) => ({
              marginRight: "15px",
              fontWeight: isActive ? "bold" : "normal",
              textDecoration: isActive ? "underline" : "none"
            })}
          >
            Subjects
          </NavLink>
          <NavLink
            to="/grades"
            style={({ isActive }) => ({
              marginRight: "15px",
              fontWeight: isActive ? "bold" : "normal",
              textDecoration: isActive ? "underline" : "none"
            })}
          >
            Grades
          </NavLink>
        </nav>

        <Routes>
          <Route path="/" element={<Students />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/grades" element={<Grades />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

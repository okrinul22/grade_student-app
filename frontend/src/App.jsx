import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom"
import Students from "./pages/Students"
import Subjects from "./pages/Subjects"
import Grades from "./pages/Grades"
import Reports from "./pages/Reports"

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex" style={{ minHeight: "100vh" }}>
        {/* Sidebar */}
        <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{ width: "280px" }}>
          <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            <i className="bi bi-mortarboard-fill me-2 fs-4"></i>
            <span className="fs-4">Student System</span>
          </a>
          <hr />
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-link text-white ${isActive ? "active" : ""}`
                }
              >
                <i className="bi bi-people-fill me-2"></i>
                Students
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/subjects"
                className={({ isActive }) =>
                  `nav-link text-white ${isActive ? "active" : ""}`
                }
              >
                <i className="bi bi-book-fill me-2"></i>
                Subjects
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/grades"
                className={({ isActive }) =>
                  `nav-link text-white ${isActive ? "active" : ""}`
                }
              >
                <i className="bi bi-clipboard-data-fill me-2"></i>
                Grades
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/reports"
                className={({ isActive }) =>
                  `nav-link text-white ${isActive ? "active" : ""}`
                }
              >
                <i className="bi bi-bar-chart-fill me-2"></i>
                Reports
              </NavLink>
            </li>
          </ul>
          <hr />
          <div className="d-flex align-items-center text-white">
            <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center me-2" style={{ width: "32px", height: "32px" }}>
              <i className="bi bi-person-fill"></i>
            </div>
            <strong>Admin</strong>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow-1" style={{ backgroundColor: "#f8f9fa" }}>
          {/* Top Navbar */}
          <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
            <div className="container-fluid">
              <span className="navbar-brand mb-0 h1">Dashboard</span>
              <div className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Search..." />
                <button className="btn btn-outline-primary" type="submit">Search</button>
              </div>
            </div>
          </nav>

          {/* Page Content */}
          <div className="container-fluid p-4">
            <Routes>
              <Route path="/" element={<Students />} />
              <Route path="/subjects" element={<Subjects />} />
              <Route path="/grades" element={<Grades />} />
              <Route path="/reports" element={<Reports />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App

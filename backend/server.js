const express = require("express")
const cors = require("cors")

const prisma = require("./prismaClient")

const app = express()

app.use(cors())
app.use(express.json())

/* ROOT */
app.get("/", (_req, res) => {
  res.json({
    message: "Student Exercise API",
    endpoints: [
      "/students",
      "/subjects",
      "/grades",
      "/reports"
    ]
  })
})

/* =========================
   STUDENT CRUD
========================= */

// GET all students
app.get("/students", async (req, res) => {
  const students = await prisma.student.findMany()
  res.json(students)
})

// CREATE student
app.post("/students", async (req, res) => {
  try {
    const { name, gender, address } = req.body

    const student = await prisma.student.create({
      data: {
        name,
        gender,
        address
      }
    })

    res.json(student)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// UPDATE student
app.put("/students/:uuid", async (req, res) => {
  try {
    const uuid = Number(req.params.uuid)
    const { name, gender, address } = req.body

    const student = await prisma.student.update({
      where: { uuid },
      data: {
        name,
        gender,
        address
      }
    })

    res.json(student)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// DELETE student
app.delete("/students/:uuid", async (req, res) => {
  try {
    const uuid = Number(req.params.uuid)

    await prisma.student.delete({
      where: { uuid }
    })

    res.json({ message: "Student deleted" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

/* =========================
   SCHOOL SUBJECT CRUD
========================= */

// GET subjects
app.get("/subjects", async (req, res) => {
  const subjects = await prisma.school_subject.findMany()
  res.json(subjects)
})

// CREATE subject
app.post("/subjects", async (req, res) => {
  try {
    const { subject_name } = req.body

    const subject = await prisma.school_subject.create({
      data: {
        subject_name
      }
    })

    res.json(subject)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// UPDATE subject
app.put("/subjects/:uuid", async (req, res) => {
  try {
    const uuid = Number(req.params.uuid)
    const { subject_name } = req.body

    const subject = await prisma.school_subject.update({
      where: { uuid },
      data: { subject_name }
    })

    res.json(subject)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// DELETE subject
app.delete("/subjects/:uuid", async (req, res) => {
  try {
    const uuid = Number(req.params.uuid)

    await prisma.school_subject.delete({
      where: { uuid }
    })

    res.json({ message: "Subject deleted" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

/* =========================
   GRADES CRUD
========================= */

// GET grades
app.get("/grades", async (req, res) => {
  const grades = await prisma.grade.findMany({
    include: {
      student: true,
      subject: true
    }
  })

  res.json(grades)
})

// CREATE grade
app.post("/grades", async (req, res) => {
  try {
    const { student_uuid, school_subject_uuid, score } = req.body

    const newGrade = await prisma.grade.create({
      data: {
        student_uuid: Number(student_uuid),
        school_subject_uuid: Number(school_subject_uuid),
        grade_value: String(score)
      }
    })

    res.json(newGrade)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// DELETE grade
app.delete("/grades/:uuid", async (req, res) => {
  try {
    const uuid = Number(req.params.uuid)

    await prisma.grade.delete({
      where: { uuid }
    })

    res.json({ message: "Grade deleted" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

/* =========================
   REPORT API
========================= */

// GET student reports with average score
app.get("/reports", async (req, res) => {
  try {
    const grades = await prisma.grade.findMany({
      include: {
        student: true,
        subject: true
      }
    })

    const report = {}

    // Grade value to number mapping
    const gradeToNumber = { 'A': 4, 'B': 3, 'C': 2, 'D': 1, 'E': 0 }

    grades.forEach(g => {
      const studentUuid = g.student_uuid

      if (!report[studentUuid]) {
        report[studentUuid] = {
          uuid: studentUuid,
          name: g.student?.name || 'Unknown',
          gender: g.student?.gender,
          address: g.student?.address,
          subjects: [],
          total: 0,
          count: 0
        }
      }

      report[studentUuid].subjects.push({
        subject: g.subject?.subject_name || 'Unknown',
        score: g.grade_value
      })

      const scoreValue = gradeToNumber[g.grade_value?.toUpperCase()] || 0
      report[studentUuid].total += scoreValue
      report[studentUuid].count += 1
    })

    const result = Object.values(report).map(r => ({
      uuid: r.uuid,
      name: r.name,
      gender: r.gender,
      address: r.address,
      subjects: r.subjects,
      average: r.count > 0 ? (r.total / r.count).toFixed(2) : '0.00',
      averageLetter: r.count > 0 ? getAverageLetter(r.total / r.count) : '-'
    }))

    function getAverageLetter(avg) {
      if (avg >= 4) return 'A'
      if (avg >= 3) return 'B'
      if (avg >= 2) return 'C'
      if (avg >= 1) return 'D'
      return 'E'
    }

    res.json(result)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

/* =========================
   SERVER
========================= */

app.listen(3000, () => {
  console.log("Server running on port 3000")
})
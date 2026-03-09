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
      "/grades"
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
      school_subject: true
    }
  })

  res.json(grades)
})

// CREATE grade
app.post("/grades", async (req, res) => {
  try {
    const { student_uuid, school_subject_uuid, grade } = req.body

    const newGrade = await prisma.grade.create({
      data: {
        student_uuid,
        school_subject_uuid,
        grade
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
   SERVER
========================= */

app.listen(3000, () => {
  console.log("Server running on port 3000")
})
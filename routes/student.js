const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { Student, validate } = require("../models/student");

// get all students
// router.get("/", (req, res) => {
//   res.status(200).send(studentsRecord);
// });

router.get("/:id", async (req, res) => {
  const schema = Joi.object({
    id: Joi.string().min(10).max(10).required().label("Student Id"),
  });

  const results = schema.validate({ id: req.params.id });
  if (results.error)
    return res.status(400).send(results.error.details[0].message);

  const student = await Student.find({ id: req.params.id });
  if (!student || student.length === 0)
    return res.status(400).send({
      message: "Invalid Student ID",
    });

  const [singleStudent] = student;
  res.status(200).send(singleStudent);
});

router.post("/", async (req, res) => {
  try {
    const result = validate(req.body);
    if (result.error) {
      return res.status(400).send(result.error.details);
    }
  } catch (ex) {
    console.log("error", ex);
  }

  //   const searchedStudent = studentsRecord.find((s) => s.id === req.body.id);
  //   if (searchedStudent) {
  //     return res.status(404).send("Student already exits");
  //   }

  let student = new Student({
    id: req.body.id,
    studentName: req.body.studentName,
    course: req.body.course,
    validityPeriod: req.body.validityPeriod,
    branchName: req.body.branchName,
    grade: req.body.grade,
  });

  student = await student.save();

  res.status(200).send(student);
});

module.exports = router;

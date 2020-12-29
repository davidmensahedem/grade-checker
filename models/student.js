const mongoose = require("mongoose");
const Joi = require("joi");

const studentSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  studentName: { type: String, required: true },
  course: { type: String, required: true },
  validityPeriod: { type: String, required: true },
  branchName: { type: String, required: true },
  grade: { type: Number, required: true },
});

const Student = mongoose.model("Student", studentSchema);

const validateStudent = (student) => {
  const schema = Joi.object({
    id: Joi.string().min(10).max(10).required().label("Student ID"),
    studentName: Joi.string().min(3).required().label("Student Name"),
    course: Joi.string().required().label("Course"),
    validityPeriod: Joi.string().required().label("Period"),
    branchName: Joi.string().required().label("Branch Name"),
    grade: Joi.number().min(0).max(100).required().label("Grade"),
  });
  return schema.validate(student, { abortEarly: false });
};

exports.Student = Student;
exports.validate = validateStudent;

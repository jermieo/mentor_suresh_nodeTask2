import express from "express";
import {
  postStudent,
  DeleteStudent,
  GetAllStudentrDetails,
  AddmentortoStudnets,
  MentorCannotAssignList,
  updateStudent,
  previouslyMentorList,
  previouslyMentorListId,
} from "../Controller/Student.Controller.js";
import {
  postMentor,
  DeleteMentor,
  GetAllMentorDetails,
  ParticularMentorShowStudentList,
} from "../Controller/Mentor.Controller.js";

const router = express.Router();
// student create
router.post("/student/create", postStudent);
// mentor create
router.post("/mentor/create", postMentor);
// student delete Id
router.delete("/student/delete/:id", DeleteStudent);
// mentor delete Id
router.delete("/mentor/delete/:id", DeleteMentor);
// get mentor all data
router.get("/mentor/all/data", GetAllMentorDetails);
// get students all data
router.get("/students/all/data", GetAllStudentrDetails);
// Select one mentor and Add multiple Student
router.put("/add/mentor", AddmentortoStudnets);
// A student Who has a mentor should not be show in list
router.get("/connot/assign/student", MentorCannotAssignList);
// Write API to show all students for a particular mentor
router.get("/Mentor/assign/studentList/:id", ParticularMentorShowStudentList);
// Select One Student and Assign one Mentor
router.put("/update/change/mentor", updateStudent);
// Write an API to show the previously assigned mentor for a particular student
router.put("/previous/mentor", previouslyMentorList);
router.get("/get/previous/mentor/:id", previouslyMentorListId);

export default router;

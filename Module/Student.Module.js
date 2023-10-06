import mongoose from "mongoose";

const student = mongoose.Schema({
  firstName: String,
  lastName: String,
  position: String,
  email: String,
  studentId: String,
  mentorId: String,
  oldmentorId: Array,
});

const StudentDetails = mongoose.model("StudentDetails", student);

export default StudentDetails;

import mongoose from "mongoose";

const Mentor = mongoose.Schema({
  firstName: String,
  lastName: String,
  position: String,
  email: String,
  mentorId: String,
});

const MentorDetails = mongoose.model("MentorDetails", Mentor);

export default MentorDetails;

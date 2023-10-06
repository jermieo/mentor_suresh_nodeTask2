import MentorDetails from "../Module/Mentor.Modul.js";
import StudentDetails from "../Module/Student.Module.js";

// create mentor
export const postMentor = async (req, res) => {
  try {
    const bodydata = req.body;
    console.log(bodydata, "bodydata");
    const mentordata = await MentorDetails.find();
    console.log("mentordatas", mentordata);
    const filterdata = mentordata.filter(
      (data) => data.mentorId == bodydata.mentorId
    );
    if (filterdata == "") {
      const mentor = new MentorDetails(bodydata);
      await mentor.save();
      res.status(201).json({ message: "Mentor Added Successfully" });
    } else {
      return res.status(404).json({ error: "mentorId id already included" });
    }
  } catch (error) {
    res.status(500).json({ message: "Mentor Added some problem" });
  }
};
// Delete mentor
export const DeleteMentor = async (req, res) => {
  try {
    const mentorId = req.params.id;
    const result = await MentorDetails.deleteOne({ _id: mentorId });
    console.log("Delete Result : ", result, "Result");
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "mentorId id not Found" });
    }
    res.status(200).json({ message: "mentorId Delete successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error in Delete" });
  }
};
// get All mentor Details
export const GetAllMentorDetails = async (req, res) => {
  try {
    const mentor = await MentorDetails.find();
    if (!mentor) {
      res.status(500).json({ message: "mentor Data Empty" });
    }
    res.status(200).json({ message: "mentor Available Details", mentor });
  } catch (error) {
    res.status(500).json({ message: "Error in get by mentor Details" });
  }
};
// Write API to show all students for a particular mentor
export const ParticularMentorShowStudentList = async (req, res) => {
  try {
    const mentorId = req.params.id;
    const studentList = await StudentDetails.find({ mentorId: mentorId });
    console.log(studentList, "studentList");
    if (studentList.length <= 0) {
      res.status(200).json({ message: "student list is Empty" });
    } else {
      res.status(200).json({
        message: "Particular Mentor Show StudentLists",
        data: studentList,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in ParticularMentorShowStudentList" });
  }
};

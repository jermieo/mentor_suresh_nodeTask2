import StudentDetails from "../Module/Student.Module.js";
import MentorDetails from "../Module/Mentor.Modul.js";

export const postStudent = async (req, res) => {
  try {
    const bodydata = req.body;
    bodydata.mentorId = null;
    console.log(bodydata, "bodydata");
    let StudentAll = await StudentDetails.find();
    let filterdata = StudentAll.filter(
      (data, index) => data.studentId == bodydata.studentId
    );
    if (filterdata != "") {
      return res.status(500).json({ error: "student id allredy include" });
    } else {
      const student = new StudentDetails(bodydata);
      await student.save();
      res.status(200).json({ message: "Student Created" });
    }
  } catch (error) {
    res.status(500).json({ message: "Student Create Some problem" });
  }
};
// Delete student
export const DeleteStudent = async (req, res) => {
  try {
    const stuId = req.params.id;
    const result = await StudentDetails.deleteOne({ _id: stuId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "student id not Found" });
    }
    res.status(200).json({ message: "student Delete successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error in Delete" });
  }
};
// get All Student Details
export const GetAllStudentrDetails = async (req, res) => {
  try {
    const students = await StudentDetails.find();
    if (!students) {
      res.status(500).json({ message: "students Data Empty" });
    }
    res.status(200).json({ message: "students Available Details", students });
  } catch (error) {
    res.status(500).json({ message: "Error in get by students Details" });
  }
};

// add mentor to multiple student
export const AddmentortoStudnets = async (req, res) => {
  try {
    const bodydata = req.body;
    const mentorId = bodydata.mentorId;
    const students = bodydata.students;
    for (let i = 0; i < students.length; i++) {
      StudentDetails.findOne({ studentId: students[i] }).then(async (data) => {
        await StudentDetails.updateOne(
          { studentId: data.studentId },
          { $set: { mentorId: mentorId } }
        );
      });
    }
    res.status(200).json({ message: "update done" });
  } catch (error) {
    res.status(500).json({ message: "student update some problem" });
  }
};
// A student Who has a mentor should not be show in list
export const MentorCannotAssignList = async (req, res) => {
  try {
    const data = await StudentDetails.find({ mentorId: null });
    res.status(200).json({
      message: "From data can't assign mentor Show List",
      data: data,
    });
  } catch (error) {
    res.status(500).json({ message: "get assign data some problem" });
  }
};

// Select One Student and Assign one Mentor
export const updateStudent = async (req, res) => {
  try {
    const data = req.body;
    const mentorIdd = data.mentorId;
    const studentIdd = data.studentId;
    const studentDetailss = await StudentDetails.findOne({
      studentId: studentIdd,
    });
    if (studentDetailss) {
      const studentrecords = await StudentDetails.updateOne(
        { studentId: studentDetailss.studentId },
        { $set: { mentorId: mentorIdd } }
      );
      res.status(200).json({
        message: "Select One Student and Assign one Mentor completed",
        data: studentrecords,
      });
    } else {
      res.status(200).json({
        message: "Student Id Not found",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
// Write an API to show the previously assigned mentor for a particular student
export const previouslyMentorList = async (req, res) => {
  try {
    const data = req.body;
    const MId = data.mentorId;
    const SId = data.studentId;
    const records = await StudentDetails.findOne({ studentId: SId });
    if (records) {
      if (records.mentorId == null) {
        const data1 = await StudentDetails.updateOne(
          { studentId: records.studentId },
          { $set: { mentorId: MId } }
        );
        res.status(200).json({
          message: "assigned first mentor to student",
        });
      } else {
        const array = [];
        if (records.oldmentorId && records.oldmentorId.length > 0) {
          for (let i = 0; i < records.oldmentorId.length; i++) {
            array.push(records.oldmentorId[i]);
          }
        }
        array.push(records.mentorId);

        const obj = {
          _id: records._id,
          firstName: records.firstName,
          lastName: records.lastName,
          position: records.position,
          email: records.email,
          studentId: records.studentId,
          mentorId: MId,
          oldmentorId: array,
        };
        const a = await StudentDetails.findByIdAndUpdate(
          { _id: records._id },
          { $set: obj }
        );
        res.status(200).json({
          message: "From data can't assign mentor Show List",
          data: obj,
        });
      }
    } else {
      res.status(500).json({ message: "student Id is worng" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const previouslyMentorListId = async (req, res) => {
  try {
    const studentId = req.params.id;
    const studentdata = await StudentDetails.findOne({ studentId: studentId });
    const mentors = studentdata.oldmentorId;
    const data = [];
    for (let index = 0; index < mentors.length; index++) {
      const result = await MentorDetails.findOne({ mentorId: mentors[index] });
      data.push(result);
    }
    res.status(200).json({
      message: "old MentorLists assigned mentor data",
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};

import mongoose from "mongoose";

const StudentAcademicSchema = new mongoose.Schema({
    rollno: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    gpa: {type: Number,required:true},
    attendance:{type:Number,required:true},
    study_hours:{type:Number,required:true}
})

const StudentAcademic = mongoose.model('StudentAcademic',StudentAcademicSchema)

export default StudentAcademic
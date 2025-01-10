import mongoose from "mongoose";

// User schema
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resetToken: { type: String }, // For password reset
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }]  // Array of course references
});


const CourseSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true 
    }
});


// Models
const User = mongoose.model("learn", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

export  {User, Course};

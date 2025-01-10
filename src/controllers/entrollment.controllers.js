import crypto from "crypto";
import bcrypt from "bcrypt";
//import User from "../models/user.model.js"; // Adjust the path as per your project structure
import { User, Course } from "../models/user.model.js"; // Assuming you have User and Course models

// Request Password Reset (Generate Token)
export const requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate a reset token
        const resetToken = crypto.randomBytes(32).toString("hex");
        user.resetToken = resetToken;
        await user.save();

        // Simulate sending email by logging the token
        console.log(`Password reset token for ${email}: ${resetToken}`);

        res.status(200).json({ message: "Password reset token generated. Check your email." });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Reset Password
export const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const user = await User.findOne({ resetToken: token });
        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetToken = null; // Clear the reset token
        await user.save();

        res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


// Enroll in a course
//import User from "../models/User.js"; // Adjust the path if needed
//import User from "../models/User.js"; // Adjust the path if neede

// Enroll a user in a course (Add a new course)


// Controller for Course Enrollment

// Enroll in a course
export const enrollCourse = async (req, res) => {
    try {
        const { name } = req.body;
        const course = new Course({ name });
        await course.save();
        res.status(201).json({ message: "Course added successfully", course });
    } catch (error) {
        res.status(500).json({ message: "Error adding Course", error });
    }
};

// Get all books
export const getEnrolledCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: "Error fetching Courses", error });
    }
};

// Update a book
export const updateCourse = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        // Check if the book exists
        const book = await Course.findById(id);
        if (!book) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Update book details
        book.name = name || book.name;
        //book.author = author || book.author;

        await book.save();
        res.status(200).json({ message: "Course updated successfully", book });
    } catch (error) {
        res.status(500).json({ message: "Error updating Courses", error });
    }
};

// Delete a book
export const deleteCourse = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Check if the book exists
      const book = await Course.findById(id);
      if (!book) {
        return res.status(404).json({ message: "Course not found" });
      }
  
      // Delete the book using findByIdAndDelete
      await Course.findByIdAndDelete(id);
  
      res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
      console.error("Error deleting Courses:", error); // Log the error for debugging
      res.status(500).json({ message: "Error deleting Courses", error });
    }
  };
  
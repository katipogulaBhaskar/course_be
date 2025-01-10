import express from "express";
import { logInUser, signUpUser, logoutUser } from '../controllers/user.controllers.js';


import {
    requestPasswordReset,
    resetPassword,
    enrollCourse,
    getEnrolledCourses,
    updateCourse, deleteCourse
} from "../controllers/entrollment.controllers.js"; // Adjust the path

const router = express.Router();

router.post('/signupUser', signUpUser);

router.post('/loginUser', logInUser);

router.post('/logout', logoutUser);


router.post("/reset-password-request", requestPasswordReset);
router.post("/reset-password", resetPassword);

// Course enrollment routes
router.post("/enroll-course", enrollCourse);
router.get("/enrolled-courses", getEnrolledCourses);
router.put("/update-course/:id", updateCourse);

// Route to delete a course
router.delete("/delete-course/:id", deleteCourse);


export default router;
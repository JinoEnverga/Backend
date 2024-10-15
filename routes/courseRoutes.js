const express = require('express');
const {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse
} = require('../controllers/courseController');

const router = express.Router();

// Route to create a new course
router.post('/', createCourse);

// Route to get all courses
router.get('/', getAllCourses);

// Route to get a specific course by ID
router.get('/:id', getCourseById);

// Route to update a course
router.put('/:id', updateCourse);

// Route to delete a course
router.delete('/:id', deleteCourse);

module.exports = router;

const express = require('express');
const {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent
} = require('../controllers/studentsController');

const router = express.Router();

// Route for creating a new student
router.post('/', createStudent);

// Route for getting all students
router.get('/', getAllStudents);

// Route for getting a student by ID
router.get('/:id', getStudentById);

// Route for updating a student by ID
router.put('/:id', updateStudent);

// Route for deleting a student by ID
router.delete('/:id', deleteStudent);

// Export the router
module.exports = router;

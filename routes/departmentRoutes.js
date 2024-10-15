const express = require('express');
const {
    createDepartment,
    getAllDepartments,
    getDepartmentById,
    updateDepartment,
    deleteDepartment
} = require('../controllers/departmentController');

const router = express.Router();

// Route to create a new department
router.post('/', createDepartment);

// Route to get all departments
router.get('/', getAllDepartments);

// Route to get a single department by ID
router.get('/:id', getDepartmentById);

// Route to update a department
router.put('/:id', updateDepartment);

// Route to delete a department
router.delete('/:id', deleteDepartment);

module.exports = router;

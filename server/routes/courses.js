const express = require('express');
const router = express.Router();
const { getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse } = require('../controllers/courseController');

router.route('/').get(getAllCourses).post(createCourse);
router.route('/:id').get(getCourseById).put(updateCourse).delete(deleteCourse);

module.exports = router;

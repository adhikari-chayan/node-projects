const express = require('express');
const router = express.Router();
const { getJobs, newJob, getJobsInRadius, updateJob, deleteJob, getJob, jobStats } = require('../controllers/jobsController');
const catchAsyncErrors = require('../utils/catchAsyncErrors');

router.route('/jobs').get(getJobs);
router.route('/job/:id/:slug').get(getJob);
router.route('/jobs/:zipcode/:distance').get(getJobsInRadius);
router.route('/job/new').post(catchAsyncErrors(newJob));
router.route('/job/:id')
    .put(updateJob)
    .delete(deleteJob);
router.route('/stats/:topic').get(jobStats);


module.exports = router;
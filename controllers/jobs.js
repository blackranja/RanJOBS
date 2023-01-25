const Job = require('../models/job');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const getAllJobs = async (req, res) => {
    const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt');
    res.status(StatusCodes.OK).json({ jobs, cout: jobs.length });

}
const getJob = async (req, res) => {
    const { user: { userId }, params: { id: jobId } } = req

    const job = await Job.findOne({
        _id: jobId,
        createdBy: userId
    })
    if (!job) {
        throw new NotFoundError('No Job with Id');
    }
    res.status(StatusCodes.OK).json({ job });
}

const updateJob = async (req, res) => {
    res.send('Update a Job');
}

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({ job });

}

const deleteJob = async (req, res) => {
    res.send('Delete a Job');
}


module.exports = {
    getAllJobs,
    getJob,
    updateJob,
    createJob,
    deleteJob
}
const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    unique: true,
    required: [true, 'Please enter a Project Name'],
    maxlength: [50, 'Project Name Cannot be exceed 50 characters'],
  },
  domain: {
    type: String,
    required: [true, 'Please enter a Domain Name']
  },
  teamSize: {
    type: Number,
    required: [true, 'Please enter a Team'],
    maxlength: [10, 'Team size cannot be more than 10  members'],
  },
  active: {
    type: Boolean,
    default: false,
  },
  cilentName: {
    type: String,
    required: [true, 'Please enter a Cilent Name'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Project', ProjectSchema);

const mongoose = require('mongoose');
const slugify = require('slugify');

const ProjectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    unique: true,
    required: [true, 'Please enter a Project Name'],
    maxlength: [50, 'Project Name Cannot be exceed 50 characters'],
  },
  slug:String,
  description:{
    type:String,
    required: [true, 'Please enter a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
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
  user:{
    type:mongoose.Schema.ObjectId,
    ref:'User', 
    required:true
  }
});

// create Project Slug from the Name 
ProjectSchema.pre('save',function (next){

  this.slug = slugify(this.projectName,{lower:true});

   next();
})


module.exports = mongoose.model('Project', ProjectSchema);

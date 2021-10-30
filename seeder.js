const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

const Projects = require('./models/Project');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const projects = JSON.parse(
  fs.readFileSync(`${__dirname}/data/project.json`, 'utf-8')
);

const importData = async () => {
  try {
    await Projects.create(projects);

    console.log('Data Imported  Successfully !!!!');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

importData();

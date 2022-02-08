const addExperiencePhotos = require('./addExperiencePhoto');
const deleteExperience = require('./deleteExperience');
const editExperience = require('./editExperience');
const getExperience = require('./getExperience');
const experienceVotes = require('./experienceVotes');
const newExperience = require('./newExperience');
const getExperienceList = require('./getExperiencesList');
module.exports = {
    getExperience,
    editExperience,
    experienceVotes,
    newExperience,
    getExperienceList,
    addExperiencePhotos,
    deleteExperience,
};

const addEntryPhotos = require('./addEntryPhoto');
const deleteExperience = require('./deleteExperience');
const editExperience = require('./editExperience');
const getExperience = require('./getExperience');
const experienceVotes = require('./experienceVotes');
const newExperience = require('./newExperience');
const getExperienceList = require('./getExperiencesList');
const getReviews = require('./getReviews');

module.exports = {
    getExperience,
    editExperience,
    experienceVotes,
    newExperience,
    getReviews,
    addEntryPhotos,
    deleteExperience,
    getExperienceList,
};

const mongoose = require('mongoose');
const announcementSchema = new mongoose.Schema({
    announcement: {
        type: String,
        required: true
    }
})



module.exports = new mongoose.model("Announcement", announcementSchema);


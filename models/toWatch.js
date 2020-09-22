const mongoose = require('mongoose');
const { Schema } = mongoose;

const toWatchSchema = new Schema({
    userId: String,
    what: String,
    where: String,
    done: String
});

mongoose.model('toWatch', toWatchSchema);
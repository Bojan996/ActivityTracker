const mongoose = require('mongoose');
const { Schema } = mongoose;

const toTravelSchema = new Schema({
    userId: String,
    where: String,
    cost: String,
    done: String
});

mongoose.model('toTravel', toTravelSchema);
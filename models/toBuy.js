const mongoose = require('mongoose');
const { Schema } = mongoose;

const toBuySchema = new Schema({
    userId: String,
    what: String,
    cost: String,
    done: String
});

mongoose.model('toBuy', toBuySchema);
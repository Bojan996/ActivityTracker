const mongoose = require('mongoose');
const { Schema } = mongoose;

const toDoSchema = new Schema({
    userId: String,
    what: String,
    dateStart: Number,
    dateEnd: Number,
    done: String
});

mongoose.model('toDo', toDoSchema);
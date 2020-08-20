const mongoose = require('mongoose');

mongoose.connect(
    'mongodb+srv://BobanIDzuo:0638893835m@cluster0.gzauw.mongodb.net/todoList?retryWrites=true&w=majority', 
    { useNewUrlParser: true, useUnifiedTopology: true }
);
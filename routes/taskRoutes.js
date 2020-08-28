const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const ToDo = mongoose.model('toDo');

module.exports = (app) => {
    app.get('/api/todo', requireLogin, async (req, res) => {
        const value = await ToDo.find({userId: req.user.id});
        try {
            res.send(value);
        } catch(err) {
            res.send(err);
        }
    });
    app.post('/api/todo', requireLogin, async (req, res) => {

        const { what, dateEnd } = req.body;
        const newToDo = new ToDo({
            userId: req.user.id,
            what,
            dateStart: Date.now(),
            dateEnd,
            done: 'pending'
        });

        await newToDo.save();
        try{
            res.send('Created a new to do!');
        } catch (err) {
            res.status(422).send(err);
        }

    });
    app.delete('/api/todo', async (req, res) => {
        await ToDo.findByIdAndDelete(req.body.id);
        try {
            res.send('Well Done!');
        } catch(err) {
            res.send(err);
        }
    });
    app.put('/api/todo', async (req, res) => {
        await ToDo.findByIdAndUpdate(req.body.id, {done: req.body.value});
        try {
            res.send('updated!')
        } catch(err) {
            res.send(err);
        }
    });
};
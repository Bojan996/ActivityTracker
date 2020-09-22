const requireLogin = require('../middlewares/requireLogin');

exports.getRoute = (app, route, Model) => {

    app.get(route, requireLogin, async (req, res) => {
        const value = await Model.find({userId: req.user.id});
        try {
            res.send(value);
        } catch(err) {
            res.send(err);
        }
    });

};

exports.deleteRoute = (app, route, Model) => {

    app.delete(route, requireLogin, async (req, res) => {
        await Model.findByIdAndDelete(req.body.id);
        try {
            res.send('deleted!');
        } catch(err) {
            res.send(err);
        }
    });

};

exports.putRoute = (app, route, Model) => {

    app.put(route, requireLogin, async (req, res) => {
        await Model.findByIdAndUpdate(req.body.id, {done: req.body.value});
        try {
            res.send('updated!');
        } catch(err) {
            res.send(err);
        }
    });

};
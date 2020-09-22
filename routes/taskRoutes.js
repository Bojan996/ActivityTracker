const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const routeHelper = require('../helpers/routeHelper');

const ToDo = mongoose.model('toDo');
const ToWatch = mongoose.model('toWatch');
const ToBuy = mongoose.model('toBuy');
const ToTravel = mongoose.model('toTravel');

const todoRoute = '/api/todo';
const towatchRoute = '/api/towatch';
const tobuyRoute = '/api/tobuy';
const totravelRoute = '/api/totravel';

module.exports = (app) => {

    //To do routes
    routeHelper.getRoute(app, todoRoute, ToDo);
    app.post(todoRoute, requireLogin, async (req, res) => {

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
    routeHelper.deleteRoute(app, todoRoute, ToDo);
    routeHelper.putRoute(app, todoRoute, ToDo);

    //To watch routes
    routeHelper.getRoute(app, towatchRoute, ToWatch);
    app.post(towatchRoute, requireLogin, async (req, res) => {
        const {what, where} = req.body;
        const newToWatch = new ToWatch({
            userId: req.user.id,
            what,
            where,
            done: 'pending'
        });
        await newToWatch.save();
        try{
            res.send('Created a new to watch!');
        } catch (err) {
            res.status(422).send(err);
        }
    });
    routeHelper.deleteRoute(app, towatchRoute, ToWatch);
    routeHelper.putRoute(app, towatchRoute, ToWatch);

    //To buy route
    routeHelper.getRoute(app, tobuyRoute, ToBuy);
    app.post(tobuyRoute, requireLogin, async (req, res) => {
        const {what, cost} = req.body;
        const newToBuy = new ToBuy({
            userId: req.user.id,
            what,
            cost,
            done: 'pending'
        });
        await newToBuy.save();
        try{
            res.send('Created a new to buy!');
        } catch (err) {
            res.status(422).send(err);
        }
    });
    routeHelper.deleteRoute(app, tobuyRoute, ToBuy);
    routeHelper.putRoute(app, tobuyRoute, ToBuy);

    //To travel route
    routeHelper.getRoute(app, totravelRoute, ToTravel);
    app.post(totravelRoute, requireLogin, async (req, res) => {
        const {where, cost} = req.body;
        const newToTravel = new ToTravel({
            userId: req.user.id,
            where,
            cost,
            done: 'pending'
        });
        await newToTravel.save();
        try{
            res.send('Created a new to travel!');
        } catch (err) {
            res.status(422).send(err);
        }
    });
    routeHelper.deleteRoute(app, totravelRoute, ToTravel);
    routeHelper.putRoute(app, totravelRoute, ToTravel);

};
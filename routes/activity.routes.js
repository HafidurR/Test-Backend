const routes = require('express').Router();
const activity = require('../controller/activityController');

routes.get('/', activity.getAllActivity);
routes.get('/:id', activity.getDetailActivity);
routes.post('/', activity.createActivity);
routes.patch('/:id', activity.updateactivity);
routes.delete('/:id', activity.deteleActivity);

module.exports = routes;
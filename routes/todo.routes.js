const routes = require('express').Router()
const todo = require('../controller/todoController');

routes.get('/', todo.getAllTodo);
routes.get('/:id', todo.getDetailTodo);
routes.post('/', todo.createTodo);
routes.patch('/:id', todo.updateTodo);
routes.delete('/:id', todo.deleteTodo);

module.exports = routes;
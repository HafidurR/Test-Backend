require('dotenv').config();
const express       = require('express');
const morgan        = require('morgan');
const app           = express();
const port          = process.env.PORT;
const activity      = require('./routes/activity.routes');
const todo          = require('./routes/todo.routes');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/activity-groups', activity);
app.use('/todo-items', todo);

app.use((req, res, next) => {
    res.status(404).json({
        status: 'error',
        message: 'url not found'
    });
    next()
})
app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
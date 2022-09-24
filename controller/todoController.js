const {
  todo
} = require("../models");

const getAllTodo = async (req, res) => {

  await todo.findAll()
    .then((result) => {
      return res.status(200).json({
        status: 'success',
        message: "success",
        data: result
      });
    })
    .catch((err) => {
      return res.status(400).json({
        status: 'Bad request',
        message: err.message
      });
    });
}

const getDetailTodo = async (req, res) => {
  const id = req.params.id;

  await todo.findOne({
      where: {
        id: id,
      },
    })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          status: 'Not found',
          message: `Data with ID ${id} not found`,
          data: {}
        });
      } else {
        return res.status(200).json({
          status: 'success',
          message: "success",
          data: result
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        statu: 'error',
        message: err.message
      });
    })
}

const createTodo = async (req, res) => {
  const {
    activity_group_id,
    title,
    priority
  } = req.body;

  await todo
    .create({
      activity_group_id,
      title,
      is_actived: true,
      priority,
    })
    .then((result) => {
      return res.status(201).json({
        status: 'success',
        message: "success",
        data: result
      });
    })
    .catch((err) => {
      return res.status(400).json({
        status: 'Bad request',
        message: err.message,
        data: {}
      });
    });
};

const updateTodo = async (req, res) => {
  const id = req.params.id;
  const {
    activity_group_id,
    title,
    priority
  } = req.body;

  const data = await todo.findOne({
    where: {
      id: id,
    },
  });

  if (!data) {
    return res.status(404).json({
      status: 'Not found',
      message: `Data with ID ${id} not found`,
    });
  } else {
    await todo.update({
        activity_group_id,
        title,
        priority
      }, {
        where: {
          id: id
        },
      })
      .then(async () => {
        await todo.findOne({
            where: {
              id: id
            }
          })
          .then((rsl) => {
            return res.status(200).json({
              status: 'success',
              message: 'success',
              data: rsl
            });
          })
      })
      .catch((err) => {
        return res.status(500).json({
          status: 'error',
          message: err.message,
        });
      })
  }
}

const deleteTodo = async (req, res) => {
  const id = req.params.id;

  const data = await todo.findOne({
    where: {
      id: id
    },
  });

  if (!data) {
    return res.status(404).json({
      status: 'Not found',
      message: `Data with ID ${id} not found`,
    });
  } else {
    await todo.destroy({
        where: {
          id: id
        }
      })
      .then(() => {
        return res.status(200).json({
          status: 'success',
          message: 'success',
          data: {}
        });
      })
      .catch((err) => {
        return res.status(500).json({
          success: false,
          message: err.message
        });
      })
  }
}

module.exports = {
  getAllTodo,
  getDetailTodo,
  createTodo,
  updateTodo,
  deleteTodo
};
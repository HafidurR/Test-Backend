const {
  activity
} = require("../models");

const getAllActivity = async (req, res) => {
  await activity.findAll()
    .then((result) => {
      return res.status(200).json({
        status: 'success',
        message: "success",
        data: result
      });
    })
    .catch((err) => {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    });
};

const getDetailActivity = async (req, res) => {
  const id = req.params.id;

  await activity.findOne({
      where: {
        id: id
      }
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
        status: 'error',
        message: err.message
      });
    })
};

const createActivity = async (req, res) => {
  const {
    email,
    title
  } = req.body;

  await activity
    .create({
      email,
      title,
    })
    .then((result) => {
      return res.status(201).json({
        status: 'success',
        message: "success",
        data: result,
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

const updateactivity = async (req, res) => {
  const id = req.params.id;
  const {
    email,
    title
  } = req.body;

  const data = await activity.findOne({
    where: {
      id: id,
    },
  });

  if (!data) {
    return res.status(404).json({
      status: 'Not found',
      message: `Data with ID ${id} not found`,
      data: {}
    });
  } else {
    await activity.update({
        email,
        title
      }, {
        where: {
          id: id
        },
      })
      .then(async () => {
        await activity.findOne({
            where: {
              id: id
            }
          })
          .then((rsl) => {
            return res.status(200).json({
              status: 'success',
              message: "success",
              data: rsl
            });
          })
      })
      .catch((err) => {
        return res.status(500).json({
          status: 'error',
          message: err.message
        });
      })
  }
};

const deteleActivity = async (req, res) => {
  const id = req.params.id;

  const data = await activity.findOne({
    where: {
      id: id
    },
  });

  if (!data) {
    return res.status(404).json({
      status: 'Not found',
      message: `Data with ID ${id} not found`,
      data: {}
    });
  } else {
    await activity.destroy({
        where: {
          id: id
        }
      })
      .then(() => {
        return res.status(200).json({
          status: 'success',
          message: "success",
          data: {}
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: 'error',
          message: err.message
        });
      })
  }
};

module.exports = {
  getAllActivity,
  getDetailActivity,
  createActivity,
  updateactivity,
  deteleActivity,
};
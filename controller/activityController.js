const {
  activity
} = require("../models");

const getAllActivity = async (req, res) => {
  await activity.findAll()
    .then((result) => {
      return res.status(200).json({
        success: true,
        message: "success get all activity",
        data: result,
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
        id: id,
      },
    })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `Data with ID ${id} not found`
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "success get detail activity",
          data: result
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
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
        success: true,
        message: "success add new activity",
        data: result,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        success: false,
        message: err.message,
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
      success: false,
      message: `Data with ID ${id} not found`,
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
              success: true,
              message: "success update activity",
              data: rsl
            });
          })
      })
      .catch((err) => {
        return res.status(500).json({
          success: false,
          message: err.message,
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
      success: false,
      message: `Data with ID ${id} not found`,
    });
  } else {
    await activity.destroy({
        where: {
          id: id
        }
      })
      .then(() => {
        return res.status(200).json({
          success: true,
          message: "success delete activity"
        });
      })
      .catch((err) => {
        return res.status(500).json({
          success: false,
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
const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");

const getUsers = async (req = request, res = response) => {
  const { limit = 5, since = 0 } = req.query;
  const query = { status: true };

  const s = Number(since) || 0;
  const l = Number(limit) || 5;

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(s)).limit(Number(l)),
  ]);

  res.json({
    total,
    users,
  });
};

const postUsers = async (req, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  // encriptar password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  await user.save();

  res.json({
    user,
  });
};

const putUsers = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...rest } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest);

  res.json({
    msg: "put API - controlador",
    user,
  });
};

const patchUsers = (req, res = response) => {
  res.json({
    msg: "patch API - controlador",
  });
};

const deleteUsers = async (req, res = response) => {
  const { id } = req.params;

  const user = await User.findByIdAndUpdate(id, { status: false });

  res.json({
    user,
  });
};

module.exports = {
  getUsers,
  putUsers,
  postUsers,
  patchUsers,
  deleteUsers,
};

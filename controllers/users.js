const { response, request } = require("express");

const getUsers = (req = request, res = response) => {
  const query = req.query;
  res.json({
    msg: "get API - controlador",
    query,
  });
};

const postUsers = (req, res = response) => {
  const body = req.body;

  res.json({
    msg: "post API - controlador",
    body,
  });
};

const putUsers = (req, res = response) => {
  const { id } = req.params;

  res.json({
    msg: "put API - controlador",
    id,
  });
};

const patchUsers = (req, res = response) => {
  res.json({
    msg: "patch API - controlador",
  });
};

const deleteUsers = (req, res = response) => {
  res.json({
    msg: "delete API - controlador",
  });
};

module.exports = {
  getUsers,
  putUsers,
  postUsers,
  patchUsers,
  deleteUsers,
};

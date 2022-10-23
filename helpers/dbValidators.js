const Role = require("../models/role");
const User = require("../models/user");

const roleValid = async (r = "") => {
  const roleExist = await Role.findOne({ role: r });
  if (!roleExist) {
    throw new Error(`The ${r} role is not registered in the database`);
  }
};

const emailExist = async (email) => {
  const exist = await User.findOne({ email });
  if (exist) {
    throw new Error("The email is already registered");
  }
};

const idExistById = async (id) => {
  const userExist = await User.findById(id);
  if (!userExist) {
    throw new Error(`The id does not exist`);
  }
};

module.exports = {
  roleValid,
  emailExist,
  idExistById,
};

const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validateFields");
const {
  getUsers,
  putUsers,
  postUsers,
  patchUsers,
  deleteUsers,
} = require("../controllers/users");
const {
  roleValid,
  emailExist,
  idExistById,
} = require("../helpers/dbValidators");

const router = Router();

router.get("/", getUsers);

router.post(
  "/",
  [
    check("name", "The name is required").not().isEmpty(),
    check(
      "password",
      "The password is required and must be greater than 6 characters"
    ).isLength({ min: 6 }),
    check("email").custom(emailExist),
    check("role").custom(roleValid),
    validateFields,
  ],
  postUsers
);

router.put(
  "/:id",
  [
    check("id", "The id is not valid").isMongoId(),
    check("id").custom(idExistById),
    check("role").custom(roleValid),
    validateFields,
  ],
  putUsers
);

router.patch("/", patchUsers);

router.delete(
  "/:id",
  [
    check("id", "The id is not valid").isMongoId(),
    check("id").custom(idExistById),
    validateFields,
  ],
  deleteUsers
);

module.exports = router;

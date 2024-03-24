const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/save-user/:username", userController.fetchUser);

router.get("/find-mutual-followers/:username", userController.getMutuals);

router.get("/search-users", userController.searchUsers);

router.get("/list-users", userController.sortUsers);

router.patch("/update-user/:username", userController.updateUser);

router.delete("/delete-user/:username", userController.deleteUser);

module.exports = router;
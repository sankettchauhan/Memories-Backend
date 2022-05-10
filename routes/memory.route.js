const express = require("express");
const router = express.Router();

const checkAuth = require("../middlewares/checkAuth");
const validate = require("../middlewares/validate");
const { validateMemory } = require("../models/memory.model");
const {
  getAllPublicMemories,
  retrieveMemories,
  createMemory,
} = require("../controllers/memory.controller");

// list all public memories
router.get("/", checkAuth, getAllPublicMemories);
// list all user's memories
router.get("/me", checkAuth, retrieveMemories);
// post a memory
router.post("/", [checkAuth, validate(validateMemory)], createMemory);

module.exports = router;

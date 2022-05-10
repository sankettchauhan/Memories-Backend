const upload = require("../middlewares/upload");
const express = require("express");
const router = express.Router();

router.post("/upload", upload.single("file"), async (req, res) => {
  if (req.file === undefined) return res.send("you must select a file.");
  return res.json({ filename: req.file.filename });
});

module.exports = router;

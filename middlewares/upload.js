const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const { MONGODB_URI } = require("../config");

// when a user sends an image we check if its a valid image or not

const storage = new GridFsStorage({
  url: MONGODB_URI,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-assignment-togggle-${file.originalname}`;
      return filename;
    }

    // save image in db and return it

    return {
      bucketName: "images",
      filename: `${Date.now()}-assignment-togggle-${file.originalname}`,
    };
  },
});

module.exports = multer({ storage });

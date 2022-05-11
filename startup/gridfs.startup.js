const cors = require("cors");
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const uploadRoutes = require("../routes/upload.route");
const { FILE_NOT_FOUND } = require("../errors");

module.exports = function (app) {
  let gfs, gridfsBucket;
  const conn = mongoose.connection;
  conn.once("open", () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: "images",
    });
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("images");
  });

  app.use(cors());

  app.use("/file", uploadRoutes);

  app.get("/file/:filename", async (req, res, next) => {
    try {
      const file = await gfs.files.findOne({ filename: req.params.filename });
      if (
        file &&
        (file.contentType === "image/jpeg" || file.contentType === "image/png")
      ) {
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(res);
      } else {
        console.log("Error: No file found.");
        next({ status: 404, message: FILE_NOT_FOUND });
      }
    } catch (error) {
      console.log(error);
      next({ status: 404, message: API_ENDPOINT_NOT_FOUND_ERR });
    }
  });
};

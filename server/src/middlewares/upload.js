const multer = require("multer");

const util = require("util");
const maxSize = 100 * 1024 * 1024;
var storage = multer.memoryStorage();

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize }
}).array("files");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;

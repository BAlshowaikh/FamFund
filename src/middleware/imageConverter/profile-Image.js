const path = require("path")
const multer = require("multer")

const profileImageStorage = multer.diskStorage({
  //Destination for images
  destination: (req, file, callback) => {
    const uploadFolder = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "public",
      "images",
      "profile-images"
    )
    callback(null, uploadFolder)
  },

  // File name format with extension
  filename: (req, file, callback) => {
    const timeStamp = Date.now()
    const random = Math.round(Math.random() * 1e9)
    const fileExtension = path.extname(file.originalname)
    //Create unique file name
    const fileFormat = `${timeStamp}-${random}${fileExtension}`
    callback(null, fileFormat)
  },
})
//Filters out image files to accept only images
const profileImageFilter = (req, file, callback) => {
  const isImage = file.mimetype.startsWith("image/")
  if (isImage) {
    callback(null, true)
  } else {
    callback(new Error("The file is not an image"), false)
  }
}

const uploadProfileImage = multer({
  storage: profileImageStorage,
  fileFilter: profileImageFilter,
  //Maximum size is 5MB
  limits: { fileSize: 5 * 1024 * 1024 },
})
module.exports = uploadProfileImage

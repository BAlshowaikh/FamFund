// Dependencies
const multer = require("multer")
const path = require("path")

// Resolve the path where the iamges will be uploaded
// The `path.join()` method is used to concatenate all the given path segments
//  together and then normalize the resulting path.
// `__dirname` is a global variable in Node.js that contains the absolute path of the 
// directory where the currently executing JavaScript file is located.
const uploadPath = path.join(
  __dirname,
  "..",
  "..",
  "public",
  "images",
  "goal-cover-images"
)

// Storage confiruration
// Stored physically in the server => use diskStorage
// cb => stands for callback function 
// cb tells Multer when you're done and whether everything is OK.
// cb in destination => First argument: error (null = no error) | Second: where to save the file
// cd in filename => First argument: error | Second: actual filename to store on disk
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath)
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + "-" + Math.round(Math.random() * 1000);
        cb(null, fileName + path.extname(file.originalname)) // Keep the file extention
    }
})

// Filteration
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")){
        cb(null, true)
    }else{
        cb(new Error("Only image files are allowed"), false)
    }
}

// Create new multer object using the customized info provided up
const uploadGoalCoverImage = multer({
    storage,
    fileFilter,
    limits: {fileSize: 1 * 1024 * 1024} // Limit to 1 mega because we have only 0.5 giga overall for the server
})


module.exports = uploadGoalCoverImage
import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});

//! while using npm test remove "type":module from package.json
//! while using npm run dev add "type":module from package.json

// import multer from "multer";
// import path from 'path'
//! Example to upload using multer
//! note: the uploaded file will be in binary format and cannot be opened
//! to open manually add original file type format to image (ex: jpg)
// const upload = multer({
//   dest: "images",
//   limits: {
//     fileSize: 1000000,
//   },
//   fileFilter(req, file, cb) {
//! to check the file extensions regular expressions are
//! used to sort out file format type , it matches and checks the given file format
//! https://regex101.com/ to write expression or other way (file.originalname.endsWith('.jpg'))

//     // Regular expression to check for .doc and .docx file extensions
//     const filetypes = /\.(doc|docx)$/;

//     // Validate file extension
// if (filetypes.test(path.extname(file.originalname).toLowerCase())) {
//   cb(null, true); // Accept file
// } else {
//   cb(new Error("Upload a .doc or .docx file format"), false); // Reject file
// }

//     cb(undefined, true);
//     // cb(new Error('please upload a image'))
//     // cb(err,boolean) syntax
//   },
// });

// app.post("/upload", upload.single("upload"), (req, res) => {
//   res.send("File uploaded successfully");
// });

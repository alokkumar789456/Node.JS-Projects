//! for more reference go to npm official multer page 
const express = require('express')
const multer = require('multer')
const path = require('path')
const app = express()

const storage = multer.diskStorage({
  destination: function(req,file,cb){
    return cb(null,"./uploads") //!err,file
  },
  filename: function(req,file,cb){
    return cb(null,`${Date.now()}-${file.orignalname}`)
  } 
})
const upload = multer({storage})

app.set('view engine','ejs')
app.use(express.json())
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:false}))

// const upload = multer({dest: "uploads/"}) //! used for 18 an 19 

app.get('/',(req,res)=>{
    res.render('index')
})

app.post('/upload',upload.single('profileImage'),(req,res)=>{
    // console.log(req.body); //! if u just directly upload file like this
    // console.log(req.file); //! your files will be corrupted meanwhile use the below method

    res.redirect('/')
})

app.listen(3000,()=>{
    console.log('Connected to Port');
})
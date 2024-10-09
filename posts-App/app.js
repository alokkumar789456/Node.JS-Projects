const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const ejs = require('ejs')
const path = require('path')
const cookie = require('cookie-parser')
const userModel = require('./model/user.js')
const postModel = require('./model/post.js')
const cookieParser = require('cookie-parser')
const crypto = require('crypto')
const upload = require('./config/multerconfig.js')
const port = process.env.port || 3000
const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))
app.use(express.json())
app.use(cookieParser())

mongoose.connect('mongodb://localhost:27017/post-App')
    .then(() => {
        console.log('mongoDb Connected');
    })
    .catch((err) => {
        console.error(err.message)
    })

app.get('/', (req, res) => {
    res.render("index")
})

app.get("/profile/upload",(req,res)=>{
    res.render("profileUpload")
})

app.post("/upload",isLoggedIn,upload.single("image"),async (req,res)=>{
    let user = await userModel.findOne({email:req.user.email})
    user.profilepic = req.file.filename;
    await user.save()
    res.redirect("/profile")
})

app.post('/register', async (req, res) => {
    const { email, age, password, name, username } = req.body;
    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).render("unsuccess")
        }
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                const newUser = await userModel.create({ email, age, password: hash, name, username });
                const token = jwt.sign(
                    { email: newUser.email, userid: newUser._id }, 'secretKey');
                res.cookie('POST-token', token);
                res.status(201).render("success")
            });
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.get('/profile', isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email }).populate("posts")
    res.render('profile', { user })
});

app.get('/like/:id', isLoggedIn, async (req, res) => {
    try {
        let post = await postModel.findOne({ _id: req.params.id }).populate("user");
        if (!post) {
            return res.status(404).send('Post not found');
        }
        if (post.likes.indexOf(req.user.userid) === -1) {
            post.likes.push(req.user.userid);
        } else {
            post.likes.splice(post.likes.indexOf(req.user.userid), 1);
        }
        await post.save();
        res.redirect('/profile');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.get('/edit/:id', isLoggedIn, async (req, res) => {
    try {
        let post = await postModel.findOne({ _id: req.params.id }).populate("user");
       res.render('edit',{post})
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.post('/update/:id', isLoggedIn, async (req, res) => {
    try {
        let post = await postModel.findOneAndUpdate({ _id: req.params.id },{content:req.body.content})
       res.redirect('/profile')
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.post('/post', isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email })
    let { content } = req.body
    let post = await postModel.create({ user: user._id, content: content })
    user.posts.push(post._id);
    await user.save()
    res.redirect("/profile")
});

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await userModel.findOne({ email });
        if (!existingUser) {
            return res.status(400).render('wrongtemplate')
        }
        bcrypt.compare(password, existingUser.password, (err, result) => {
            if (err) {
                return res.status(500).send('Internal Server Error');
            }
            if (result) {
                const token = jwt.sign({ email: email, userid: existingUser._id }, 'secretKey');
                res.cookie('POST-token', token);
                res.status(200).redirect('/profile')
            } else {
                res.status(401).render('invalid')
            }
        });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

app.get('/logout', (req, res) => {
    res.cookie("POST-token", "")
    res.redirect('login')
})

function isLoggedIn(req, res, next) {
    const token = req.cookies['POST-token'];
    if (!token) {
        return res.status(401).render('logintemplate')
    }
    // Verify the token
    jwt.verify(token, 'secretKey', (err, decoded) => {
        if (err) {
            return res.status(401).send('Invalid token');
        }
        req.user = decoded;
        next();
    });
}


app.listen(port, (err) => {
    if (err) {
        console.error(err.message)
    } else {
        console.log(`port connected to ${port}`);
    }
})

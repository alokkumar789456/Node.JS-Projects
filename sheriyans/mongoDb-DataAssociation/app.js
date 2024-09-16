const express = require('express')
const app = express()
const path = require('path')
const userModel = require('./models/user.js')
const postModel = require('./models/posts.js')

app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.render('index')
})

app.get('/create',async (req,res)=>{
    let user = await userModel.create({
        username:'loki',
        age:25,
        email:'loki@gmail.com'
    })
    res.send(user)
})

app.get('/post/create', async (req, res) => {
    try {
        let post = await postModel.create({
            postdata: "this is the post data",
            user: "66d83af95c8a928fa6a02ebd" 
        });
        let user = await userModel.findById("66d83af95c8a928fa6a02ebd"); 
        if (!user) {
            return res.status(404).send('User not found');
        }
        user.posts.push(post._id);
        await user.save();
        res.send({ post, user });

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(3000,(err)=>{
    if(err) console.error(err.message)
    else console.log('server connected successfully');
})
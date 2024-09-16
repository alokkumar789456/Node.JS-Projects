const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');
const app = express();

const port = process.env.PORT
const JWT_SECRET = process.env.JWT_SECRET_KEY

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/credentials", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const users = { email, password };
    res.cookie("credentials", JSON.stringify(users), { httpOnly: true });
    const cooked = req.cookies.credentials;

    if (cooked) {
        const parsedCookie = JSON.parse(cooked);
        console.log("Parsed Cookie:", parsedCookie);
    } else {
        console.log("No cookie found.");
    }

    res.send(
        "<p>Credentials received. Check the server console for details.</p>"
    );
});

// Route to generate JWT and set it in a cookie
app.post('/jwt', (req, res) => {
    const email = req.body.jwtEmail;
    const password = req.body.jwtPassword;

    const payload = { email, password };
    const token = jwt.sign(payload, JWT_SECRET);

    res.cookie('token', token, { httpOnly: true });

    console.log("Token: ", token);
    res.send('<p>JWT has been generated and stored in a cookie. Check the server console for details.</p>');
});

// Route to decode JWT from cookie
// surf manually to generate data from token to data 
app.get('/decode-jwt', (req, res) => {
    const JWTtoken = req.cookies.token;
    if (!JWTtoken) {
        return res.status(400).send('Token is required.');
    }
    try {
        const decoded = jwt.decode(JWTtoken, { complete: true });
        if (decoded) {
            console.log('Decoded JWT:', decoded);
            res.json(decoded);
        } else {
            res.status(400).send('Invalid token.');
        }
    } catch (error) {
        console.error('Error decoding JWT:', error);
        res.status(500).send('Error decoding JWT.');
    }
});

app.listen(port, () => {
    console.log("Server connected");
});

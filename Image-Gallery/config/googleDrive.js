const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const SCOPES = ['https://www.googleapis.com/auth/drive.file'];
const TOKEN_PATH = path.join(__dirname, 'token.json');

const credentials = JSON.parse(fs.readFileSync(path.join(__dirname,"./credentials.json")));
// console.log("path:",path.join(__dirname,"./credentials.json"));
const { client_secret , client_id, redirect_uris } = credentials.web;
// console.log(client_secret,client_id,redirect_uris);
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
console.log(oAuth2Client._clientId);

// Load or request authorization to call APIs
function authorize(callback) {
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getAccessToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client._clientId);
    });
}

module.exports = { authorize };

const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));
// console.log(path.join(__dirname, 'public'));

app.get('/', (req, res) => {
  fs.readdir(path.join(__dirname, './files'), (err, files) => {
    res.render('index', { files: files });
  })
});

app.get('/file/:filename', (req, res) => {
  fs.readFile(`./files/${req.params.filename}`, 'utf-8', function (err, fileData) {
    res.render('show', { filename: req.params.filename, fileData: fileData });
  })
});

app.get('/edit/:filename', (req, res) => {
  res.render('edit', { filename: req.params.filename}   );
});

app.post('/edit', (req, res) => {
  const previousFilename = req.body.previous;
  const newFilename = req.body.new;
  if (previousFilename === newFilename) {
    console.log('Filename is the same as the previous one.');
    return res.redirect('/'); 
  }
  const previousPath = path.join(__dirname, 'files', previousFilename);
  const newPath = path.join(__dirname, 'files', newFilename);
  fs.access(newPath, fs.constants.F_OK, (err) => {
    if (!err) {
      console.log('Filename already exists.');
      return res.redirect('/');
    }
    fs.rename(previousPath, newPath, (err) => {
      if (err) {
        console.error('Error renaming file:', err.message);
        return res.redirect('/'); 
      }
      res.redirect('/'); 
    });
  });
});

app.post('/create', (req, res) => {
  const { title, details } = req.body;
  if (!title || !details) {
    return res.status(400).send('Title and details are required.');
  }
  const filePath = path.join(__dirname, 'files', `${title.split(' ').join('')}.txt`);
  fs.writeFile(filePath, details, (err) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send('An error occurred while writing the file.');
    }
    res.redirect('/');
  });
});

app.listen(3000, (err) => {
  if (err) {
    console.error('Error starting the server:', err);
  } else {
    console.log('Server is running on port 3000');
  }
});

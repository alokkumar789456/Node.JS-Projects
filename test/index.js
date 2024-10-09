// arr = [1,2,3,4,5,6,7,8,9,10]

//! diff b/w both arr methods 
// const mapM = arr.map((x)=>x)
//  console.log(mapM);

// const foreachE = arr.forEach((x) => x)
// console.log(foreachE);

//!indexOf()
// const indexOff = arr.indexOf(5,4) //! 5 is on 4th place 
// console.log(indexOff);

//! filter and Find 
// const filterF = arr.filter((x) => x>5)
// console.log(filterF);

// const findD = arr.find((x)=>{
//     if(2===x) return x //! if there are 2 2's then it will return first element that will be 2
// })
// console.log(findD);

//! objects 
// obj = {
//     name:'loki',
//     age:'22'
// }
//ways to access 
// console.log(obj.name);
// console.log(obj['name']);

//to freeze the obj to not manipulate
// Object.freeze(obj) 

// manipulate obj
// obj.name = 'alok'
// console.log(obj.name);

//! Did you know function also length 
// const alpha = (a,b,c)=>{}
// console.log(alpha.length);
// ans will be 3 because it has three parameters 

//! error 
// console.error(error)
// console.log(error.message);


//! FIle System
// const fs = require('fs')
// const path = require('path')

//!ex to create a file or write a file 
// fs.writeFile('first.txt','hello There!',(err)=>{
//     if (err) {
//         console.error(err)    
//     } else {
//         console.log('File Got Created');
//     }
// })
//! in sync method 'utf8', so this is optional if you want to use 'utf8'.
// fs.writeFileSync('example.txt', 'Hello, world!', { encoding: 'utf8' });


//! ex to update the file or append the file 
// fs.appendFile('first.txt','\nhello There!',(err)=>{
//     if (err) {
//         console.error(err);
//     } else {
//         console.log('file got updated');
//     }
// })
//! in sync method 
// fs.appendFileSync('example.txt', 'Appending some text!', { encoding: 'utf8' });


//! ex to read a file 
// fs.readFile('first.txt','utf-8',(err,data)=>{if (err) {
//     console.error(err);
// } else {
//     console.log('file read successfully');
//     console.log(data);
// }})
//! sync method  'utf8', so this is optional if you want to use 'utf8'.
// const data = fs.readFileSync('example.txt', { encoding: 'utf8' });
// console.log(data);


//! rename the file 
// fs.rename('first.txt','hello.txt',(err)=>{
//     if (err) {
//         console.error(err);
//     } else {
//         console.log('file renamed successfully');
//     }
// })
//! sync method
// fs.renameSync('oldname.txt', 'newname.txt');


//! copy file using fs
// fs.copyFile('hello.txt','./copy/copy(hello).txt',(err)=>{
//     if (err) {
//         console.error(err);
//     } else {
//         console.log('file Copied successfully');
//     }
// })


//! delete a file or unlink a file 
// fs.unlink('./copy/copy(hello).txt',(err)=>{
//     if (err) {
//         console.error(err.message);
//     } else {
//         console.log('file deleted successfully');
//     }
// })
//! sync method
// fs.unlinkSync('example.txt'); 


//! to remove directory or delete directory     
//? use fs.rm instead fs.rmdir tip:by default rm or rmdir second parameter {recursive : false}, 
//? and if you want remove dir which has files in it you can set that to true else you can 
//? remove empty files directly without passing second argument 
// fs.rm('./copy',{recursive:true},(err)=>{
//     if (err) {
//         console.error(err.message)
//     } else {
//         console.log('dir removed successfully');
//     }
// })
//! sync method
// fs.rmdirSync('directoryToRemove', { recursive: true });


//! ex to read a dir 
// const dirPath = path.join(__dirname,'dummyData')
// fs.readdir(dirPath,(err,files)=>{
//     if (err) {
//         console.error(err.message);
//     } else {
//         files.forEach((file)=>{console.log(file);})
//     }
// })


//! simple ex to create a server using HTTP request  
// const http = require('http')

// const server = http.createServer((req,res)=>{
//     res.end('hello world!')
// })
// server.listen(3000,(err)=>{
//     if (err) {
//         console.error(err)
//     } else {
//         console.log('connected successfully');
//     }
// })

//! Express - parts [BASIC STRUCTURE] 

//! imported package
// const express = require('express')
// const app = express()

//! this is only middleWare
// app.use((req,res,next)=>{
//     console.log('this is only middleware!');
//     console.log(`${req.method} ${req.url}`);
//     next();
// })

//! cookies and session 
//? This lets your app understand JSON data in incoming requests.
// app.use(express.json())  
//? This lets your app understand URL-encoded data, including complex objects.
// app.use(express.urlencoded({ extended: true })) 


//! this is only route
//! always in callback order of the parameters should not change (err, req, res, next)
// app.get('/',(err, req, res,next) =>{
//     res.send('Hello World')
//     return next()
//   })

//! Error Handler
// app.use((err,req,res,next)=>{
//     console.log(err.stack);
//     res.status(500).send('something Broke')
// }) 

//! this is only used to start the server 
// app.listen(3000,()=>{
//     console.log('connected successfully');
// })


//! ex usage of req,res,next
// const express = require('express');
// const app = express();

//! Custom middleware to log request details and handle a specific condition
// app.use((req, res, next) => {
//     console.log('Middleware activated!');
//     console.log(`Method: ${req.method}, URL: ${req.url}`);
    
    //! Conditionally handle requests based on URL
    // if (req.url === '/special') {
    //     res.send('This is a special route!');
    // } else {
        //! if you doNt write this next() middleware it will be keep on reloading 
        //! it is used Pass control to the next middleware or route handler
//         next();  
//     }
// });

//! A sample route handler for demonstration
// app.get('/', (req, res) => {
//     res.send('Hello, World!');
// });

//! Another sample route handler to show how middleware passes control
// app.get('/another', (req, res) => {
//     res.send('You reached another route!');
// });

//! Start the server
// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });


//! fileSystem module 
// const fs = require('fs')

//! write/create file C
// fs.writeFile('hello.txt','blah blah blah!',(err)=>{
//     if (err) {
//         console.error(err.message)
//     } else {
//         console.log('file created successfully');
//     }
// })

//! read file R
// fs.readFile('hello.txt','utf-8',(err,data)=>{
//     if (err) {
//         console.error(err.message)
//     } else {
//         console.log('file was read successfully');
//         console.log(data);
//     }
// })

//! update or append the file U
// fs.appendFile('hello.txt','\nblah blah blah whatever!',(err)=>{
// if (err) {
//     console.error(err.message)
// } else {
//     console.log('file updated successfully!');
// }
// })

//!  delete a file D
// fs.unlink('hello.txt',(err)=>{
//     if (err) {
//         console.error(err.message)
//     } else {
//         console.log('file deleted successfully');
//     }
// })

//! write/create a dir C
// const path = require('path')


//! note the folder will created something like this u cant 
//! use / in the name it will be creating one more dir inside the dir 
//! dir structure
//         └── test
//             └── files
//                 └── utils
// const dirPath = path.join(__dirname,'files/utils') //use for mkdir ex
// const dirPath = path.join(__dirname,'files') //use for  readdir ex
// const dirPath = path.join(__dirname,'files/utils') //use for  readdir ex

//! create a dir C
// fs.mkdir(dirPath,{recursive:true},(err)=>{
//     if (err) {
//         console.error(err.message)
//     } else {
//         console.log('Dir created successfully');
//     }
// })

//! read a Dir R
// fs.readdir(dirPath,(err,data)=>{
//     if (err) {
//         console.error(err.message)
//     } else {
//         console.log('dir read successfully');
//         console.log(data);
//     }
// })

//! update/rename a dir U
// const oldPath = path.join(__dirname,'files/utils') 
// const newPath = path.join(__dirname,'files/fsModuleFiles')
// fs.rename(oldPath,newPath,(err)=>{
//     if (err) {
//         console.error(err.message)
//     } else {
//         console.log('file renamed successfully')
//     }
// })

//! delete a dir
// const dirPath = path.join(__dirname, 'files/fsModuleFiles');

//! if dir is empty
// fs.rmdir(dirPath, (err) => {
//     if (err) {
//         console.error('Error removing directory:', err.message);
//     } else {
//         console.log('Directory removed successfully');
//     }
// });

//! if dir is not empty 
// fs.rm(dirPath, { recursive: true, force: true }, (err) => {
//     if (err) {
//         console.error('Error removing directory:', err.message);
//     } else {
//         console.log('Directory removed successfully');
//     }
// });
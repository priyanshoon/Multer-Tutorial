const express = require("express");
const multer = require("multer");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/data/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname)
    }
})

var upload = multer({storage: storage})

const app = express();
app.use(express.json())
app.use(express.static('public'));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index");
})

app.post('/',
         upload.fields([{
           name: 'file1', maxCount: 1
         }, {
           name: 'file2', maxCount: 1
         }]), function(req, res, next){
           console.log(req.files.file1[0].filename)
  // ...
})

app.listen(3000, (req, res) => {
    console.log("Server is running up on port 3000!");
})


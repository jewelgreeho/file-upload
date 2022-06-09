const multer = require('multer');
// const upload = multer({dest:'uploads/'}).single("demo_image");



var storage = multer.diskStorage({   
    destination: function(req, file, cb) { 
       cb(null, './uploads');    
    }, 
    filename: function (req, file, cb) { 
       cb(null , file.originalname);   
    }
 });

 const upload = multer({
    storage: storage,
    limits : {fileSize : 1000000}
});




 // this code goes inside the object passed to multer()
function fileFilter (req, file, cb) {    
    // Allowed ext
     const filetypes = /jpeg|jpg|png|gif/;
  
   // Check ext
    const extname =  filetypes.test(path.extname(file.originalname).toLowerCase());
   // Check mime
   const mimetype = filetypes.test(file.mimetype);
  
   if(mimetype && extname){
       return cb(null,true);
   } else {
       cb('Error: Images Only!');
   }
  }


// load express
const express = require('express');
const app = express();

app.get("/", (req, res) => {  
   res.send("Hello World");
});


app.listen(3000, () => { 
    console.log('Started on port 3000');
});



 app.post("/images", upload.array("demo_images", 6), (req, res) =>{
    console.log(req.files)
    console.log('-------------')
    try {
      res.send(req.files);
    } catch (error) {
      console.log(error);
      res.send(200);
    }
  });
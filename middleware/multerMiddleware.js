const multer = require("multer");

// store configuration
const storage=multer.diskStorage({
    destination:(req,file,callback)=>{
        callback (null,'./uploads/hotels')
    },
    filename:(req,file,callback)=>{
        callback(null,`image-${Date.now()}-${file.originalname}`)
    }
})

// file filter option
const fileFilter=(req,file,callback)=>{
    if(file.mimetype=='image/jpg' || file.mimetype=='image/jpeg' || file.mimetype=='image/png'){
        callback(null,true)
    }else{
        callback(null,false)
    }
}

// create middleware

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5 MB file size limit
  fileFilter: fileFilter
}).array('photos', 3); // Allow up to 3 images

module.exports = upload;
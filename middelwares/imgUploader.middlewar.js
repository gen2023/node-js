const multer = require('multer');
const {FOLDER_TO_AVATARS}=require('../config');

const avatarUploader = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, FOLDER_TO_AVATARS);
    },
    filename: function (req, file, cb) {
      //загрузкакартинки с разным расширением
      const fileType = file.mimetype.split('/')[1];
      if (fileType !== 'png' && fileType !== 'jpeg' && fileType !== 'jpg') {
        return cb(new Error('File must be as picture'));
      }
      //--------------------------------------
      cb(null, `${req.userId}.jpg`);
    },
  });
  return multer({ storage: storage }).single('avatar');
};

module.exports = { avatarUploaderMiddleware: avatarUploader() };

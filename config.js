const path = require('path');

const PROTOCOL = process.env.PROTOCOL;
const HOST = process.env.HOST;
const PORT = process.env.PORT;
const GENERATE_TO_AVATARS = 'img';
const FOLDER_TO_AVATARS = 'public/images';
const FOLDER_PUBLIC = 'public';

const urlLocalhost=()=>{
  return `${PROTOCOL}://${HOST}:${PORT}`;
};

const folderAvatr = (filename) => {
    return `${PROTOCOL}://${HOST}:${PORT}/${PATH_TO_AVATARS}/${filename}`;
  };

  module.exports = {
    GENERATE_TO_AVATARS,
    FOLDER_TO_AVATARS,
    folderAvatr,
    urlLocalhost,
    FOLDER_PUBLIC,
  };
const AvatarGenerator = require('avatar-generator');
const path = require('path');
const {GENERATE_TO_AVATARS}=require('../config')

const avatar = new AvatarGenerator({
  parts: ['background', 'face', 'clothes', 'head', 'hair', 'eye', 'mouth'],
  partsLocation: path.join(__dirname, `../${GENERATE_TO_AVATARS}`),  
  imageExtension: '.png',
});

module.exports = { avatar };

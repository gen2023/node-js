const AvatarGenerator = require('avatar-generator');
const path = require('path');

const avatar = new AvatarGenerator({
  parts: ['background', 'face', 'clothes', 'head', 'hair', 'eye', 'mouth'],

  partsLocation: path.join(__dirname, '../img'),
  imageExtension: '.png',
});

module.exports = { avatar };

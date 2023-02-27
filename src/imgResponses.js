// Requires
const fs = require('fs');

// Get Image File
const getImage = (request, response, params) => {
  response.writeHead(200, { 'Content-Type': 'img/png' });
  response.write(fs.readFileSync(`${__dirname}/../node_modules/xwing-data/images/${params.path}`));
  response.end();
};

// Exports
module.exports = {
  getImage,
};

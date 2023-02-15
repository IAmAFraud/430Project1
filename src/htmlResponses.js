// Requires
const fs = require('fs');

// HTML files to be loaded in
const homepage = fs.readFileSync(`${__dirname}/../hosted/homepage.html`);
const js = fs.readFileSync(`${__dirname}/../hosted/bundle.js`);

// Get HTML function
const getHTML = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(homepage);
  response.end();
};

// Get JS File
const getJS = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/javascript' });
    response.write(js);
    response.end();
  };

// Exports
module.exports = {
  getHTML,
  getJS,
};

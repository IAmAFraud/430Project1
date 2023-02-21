// Requires
const fs = require('fs');

// HTML files to be loaded in
const homepage = fs.readFileSync(`${__dirname}/../hosted/homepage.html`);
const style = fs.readFileSync(`${__dirname}/../hosted/homepageStyle.css`);
const js = fs.readFileSync(`${__dirname}/../hosted/homepageBundle.js`);

// Get HTML function
const getHTML = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(homepage);
  response.end();
};

// Get CSS File
const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(style);
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
  getCSS,
  getJS,
};

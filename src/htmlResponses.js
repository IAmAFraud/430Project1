// Requires
const fs = require('fs');

// HTML files to be loaded in
const homepage = fs.readFileSync(`${__dirname}/../hosted/homepage.html`);
const editor = fs.readFileSync(`${__dirname}/../hosted/editor.html`);
const style = fs.readFileSync(`${__dirname}/../hosted/homepageStyle.css`);
const homepageJS = fs.readFileSync(`${__dirname}/../hosted/homepageBundle.js`);
const editorJS = fs.readFileSync(`${__dirname}/../hosted/editorBundle.js`);

// Get HTML function
const getHomepageHTML = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(homepage);
  response.end();
};

// Get Editor Function
const getEditorHTML = (request, response) => {
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.write(editor);
  response.end();
};

// Get CSS File
const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(style);
  response.end();
};

// Get Homepage JS File
const getHomepageJS = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/javascript' });
    response.write(homepageJS);
    response.end();
  };

  // Get Editor JS File
const getEditorJS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/javascript' });
  response.write(editorJS);
  response.end();
};

// Exports
module.exports = {
  getHomepageHTML,
  getEditorHTML,
  getCSS,
  getHomepageJS,
  getEditorJS,
};

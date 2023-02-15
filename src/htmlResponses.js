// Requires
const fs = require('fs');

// HTML files to be loaded in
const homepage = fs.readFileSync(`${__dirname}/../client/homepage.html`);

// Get HTML function
const getHTML = (request, response) => {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(homepage);
    response.end();
};

// Exports
module.exports = {
    getHTML,
};